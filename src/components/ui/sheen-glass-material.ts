// The Sheen Pill finish follows the existing animated water geometry.
export const sheenGlassMaterial = `
 vec2 uv=(p-sheenCenter)/max(sheenHalf,vec2(1.));
 float diagonal=clamp(.5+dot(uv,vec2(.25,-.25)),0.,1.);
 float band=1.-smoothstep(0.,.25,min(diagonal,1.-diagonal));
 float rim=1.-smoothstep(.25,1.65,abs(dd+.75));
 float wire=1.-smoothstep(.25,1.2,abs(dd+3.));
 float veil=smoothstep(.05,.85,uv.y)*(1.-wire);
 float da=dm*.08;vec3 dc=vec3(da);
 float la=dm*veil*.12;dc*=1.-la;da=la+da*(1.-la);
 la=dm*clamp(band*.54+rim*(.23+.38*band)+wire*.13,0.,1.);
 dc=vec3(la)+dc*(1.-la);da=la+da*(1.-la);
 la=dm*clamp(spec*.48+spec2*.35+smoothstep(.6,1.,cs)*.16*th,0.,1.);
 dc=vec3(la)+dc*(1.-la);da=la+da*(1.-la);
`;
