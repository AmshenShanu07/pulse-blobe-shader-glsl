varying float vElevation;

void main () {
  vec3 white = vec3(0.2196, 0.2196, 0.2196);
  // vec3 grey = vec3(0.85,0.85,0.85);
  vec3 grey = vec3(0.5294, 1.0, 0.6941);

  vec3 color = mix(grey, white, vec3(vElevation));



  gl_FragColor = vec4(color, 1.0);
}