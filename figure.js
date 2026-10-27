// API 2 figure: the approved illustration, animated by Coopanion's body kit.
const NS = 'http://www.w3.org/2000/svg';
const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));
const OUTFITS = {
  casual: {open:'mutsumi.png',closed:'mutsumi-closed.png',cutY:1040,scale:1,mouth:[578,695]},
  stage: {open:'mutsumi-stage.png',closed:'mutsumi-stage-closed.png',cutY:1058,scale:1155/1187,mouth:[578,695]},
  navy: {open:'mutsumi-navy.png',closed:'mutsumi-navy-closed.png',cutY:1047,scale:1155/1160,mouth:[576,696]},
};
const outfitId = id => Object.hasOwn(OUTFITS,id) ? id : 'casual';

export async function createMutsumiBody(base, {kit,host,loadImage,asset,scheme}) {
  const images=Object.fromEntries(await Promise.all(Object.entries(OUTFITS).map(async ([id,config])=>
    [id,await Promise.all([config.open,config.closed].map(file=>loadImage(String(asset(file)))))])));
  let outfit=outfitId(scheme);
  const doc=host.root.ownerDocument;
  const canvas=doc.createElement('canvas');
  canvas.width=635;canvas.height=620;
  canvas.style.cssText='display:block;width:100%;height:100%';
  const ctx=canvas.getContext('2d');
  const surface=doc.createElementNS(NS,'foreignObject');
  surface.setAttribute('x','-14');surface.setAttribute('y','-4');
  surface.setAttribute('width','285.525');surface.setAttribute('height','279');
  // The source drawing faces left; the kit's unmirrored body must face right.
  surface.setAttribute('transform','translate(256 0) scale(-1 1)');
  surface.appendChild(canvas);
  let mounted=false;
  const figure={
    colors:{z:'#6a8960'},
    get extent(){return [20,outfit==='stage'?0:19,225,256];},
    hits:[[130,91,82],[133,203,39]],
    get anchors(){return {gaze:[141,126],tear:[108,144],tears:[[170,141],[113,147]],z:[61,outfit==='stage'?2:25],hearts:[73,191,33],bubble:[130,outfit==='stage'?-6:17]};},
    setScheme(id){outfit=outfitId(id);},
    draw(group,face,f) {
      const [illustration,closedIllustration]=images[outfit];
      const config=OUTFITS[outfit];
      if(!mounted){group.appendChild(surface);mounted=true;}
      const t=f.t,sit=clamp(f.sit||0,0,1),moving=f.mode==='walk'||f.mode==='run';
      const phase=t*(f.mode==='run'?17:10),step=moving?Math.sin(phase):0;
      ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,635,620);
      ctx.scale(635/1269,620/1240);
      ctx.save();
      if(config.scale!==1){
        // Each outfit's measured shoe sole meets the same ground line.
        ctx.translate(630,0);ctx.scale(config.scale,config.scale);ctx.translate(-630,0);
      }
      ctx.translate(630,1155);ctx.scale(1,1-.1*sit);ctx.translate(-630,-1155);
      const sway=Math.sin(t*1.7)*.55+(moving?Math.sin(phase)*.8:0);
      ctx.translate(630,1034);ctx.rotate(sway*Math.PI/180);ctx.translate(-630,-1034);
      const sleepy=['sleep','sleepy','bowing'].includes(f.face)||(f.face==='content'&&f.drowse>.7);
      const blink=Math.max(f.blink||0,f.eyeClose||0)>.45;
      const closed=sleepy||blink||['happy','love','cry','flustered','dizzy','smug'].includes(f.face);
      const topImage=closed||f.face==='wink'?closedIllustration:illustration;
      // Keep the body fixed while swapping the illustrated head above the collar.
      const cutY=config.cutY,headY=742;
      ctx.drawImage(illustration,0,0,1269,cutY,0,0,1269,cutY);
      if(topImage!==illustration)ctx.drawImage(topImage,0,0,1269,headY,0,0,1269,headY);
      if(f.face==='wink'&&!closed){
        ctx.save();ctx.beginPath();ctx.ellipse(447,548,108,130,0,0,Math.PI*2);ctx.clip();
        ctx.drawImage(illustration,0,0);ctx.restore();
      }
      for(let i=0;i<2;i++){
        const x0=i===0?470:614,w=i===0?144:145;
        const swing=step*(i===0?1:-1);
        ctx.save();ctx.translate(x0+w/2,cutY-2);
        ctx.rotate(swing*.16);ctx.translate(-x0-w/2,-cutY+2);
        ctx.drawImage(illustration,x0,cutY,w,150,x0,cutY-Math.max(0,swing)*10,w,150);
        ctx.restore();
      }
      if(f.talk>.03||['surprised','scared','excited'].includes(f.face)){
        ctx.fillStyle='#784f42';ctx.beginPath();
        ctx.ellipse(...config.mouth,9,4+Math.max(f.talk,['surprised','scared','excited'].includes(f.face)?.7:0)*17,0,0,Math.PI*2);ctx.fill();
      }
      if(['shy','happy','love','smug','pout','excited'].includes(f.face)){
        ctx.fillStyle='rgba(240,135,150,.22)';for(const [x,y]of [[379,651],[725,686]]){ctx.beginPath();ctx.ellipse(x,y,32,17,0,0,Math.PI*2);ctx.fill();}
      }
      if(['angry','worried','confused'].includes(f.face)){
        ctx.strokeStyle='#687853';ctx.lineWidth=9;ctx.lineCap='round';
        const k=f.face==='angry'?1:-1;ctx.beginPath();ctx.moveTo(412,459-9*k);ctx.lineTo(475,459+9*k);ctx.moveTo(652,481+9*k);ctx.lineTo(705,481-9*k);ctx.stroke();
      }
      // The small mouth and accents are canvas features; outfit artwork stays unchanged.
      if(f.talk<=.03&&['smug','pout','determined'].includes(f.face)){
        ctx.strokeStyle='#784f42';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();
        if(f.face==='smug'){ctx.moveTo(558,689);ctx.quadraticCurveTo(580,710,599,684);}
        else if(f.face==='pout'){
          ctx.moveTo(568,684);ctx.bezierCurveTo(590,678,591,696,574,696);
          ctx.bezierCurveTo(593,696,590,715,568,710);
        }else{ctx.moveTo(561,698);ctx.quadraticCurveTo(578,700,595,699);}
        ctx.stroke();
      }
      if(f.face==='determined'){
        ctx.strokeStyle='#b9757d';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();
        ctx.moveTo(468,449);ctx.lineTo(511,466);ctx.moveTo(666,484);ctx.lineTo(706,470);ctx.stroke();
      }
      if(f.face==='scared'){
        ctx.fillStyle='#a9dceb';ctx.strokeStyle='#477c8e';ctx.lineWidth=4;
        ctx.beginPath();ctx.moveTo(805,585);ctx.bezierCurveTo(790,607,784,620,792,632);
        ctx.bezierCurveTo(802,645,821,635,817,621);ctx.closePath();ctx.fill();ctx.stroke();
      }
      if(f.face==='excited'&&!blink){
        ctx.fillStyle='#fff3ac';ctx.strokeStyle='#b99a46';ctx.lineWidth=3;
        for(const [x,y]of [[454,549],[697,586]]){
          ctx.beginPath();for(let i=0;i<8;i++){const a=-Math.PI/2+i*Math.PI/4,r=i%2?6:23;
            const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}
          ctx.closePath();ctx.fill();ctx.stroke();
        }
      }
      ctx.restore();
    },
  };
  const body=kit.createBody(host,{figure});
  return body;
}
