// Shared optical finish for the three homepage water shapes. Each shader
// supplies its own geometry, lighting normals and ripple motion.
export const clearGlassMaterial = `
 vec3 tint=vec3(.88,.94,1.);
 float rim=dm*(1.-smoothstep(0.,5.,-dd));
 float cres=dm*smoothstep(.12,.55,dot(n.xy,normalize(vec2(.55,.85))))*smoothstep(0.,3.,-dd);
 float body=.5+.5*clamp(-n.y*3.,-1.,1.);
 float da=dm*(.12+.08*body);vec3 dc=mix(tint,vec3(1.),body*.65)*da;
 float la=rim*.09;vec3 lc=vec3(.61,.74,.88);dc=lc*la+dc*(1.-la);da=la+da*(1.-la);
 la=clamp(cres*.55+smoothstep(.6,1.,cs)*.16*th*dm,0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=clamp(dm*(spec+spec2*.4),0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=dm*smoothstep(-2.,0.,dd)*.31;dc=mix(vec3(1.),irid,.14)*la+dc*(1.-la);da=la+da*(1.-la);
`;
