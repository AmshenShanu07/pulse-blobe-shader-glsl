varying vec2 vUv;

uniform float uTime;
uniform sampler2D uTexture;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

void main() {

  float pulse = distance(vUv, vec2(0.5));
  pulse = pow(pulse, 2.0);

  pulse = mod(pulse  * 5.0 - (uTime * 0.2), 0.5);
  pulse = pow(pulse, 2.0);
  pulse = smoothstep(0.0,0.5, pulse);

  float texutre = texture2D(uTexture, vUv).r;

  pulse = min(texutre, pulse);

  vec3 color = mix(
    vec3(0.2196, 0.2196, 0.2196),
    vec3(0.5294, 1.0, 0.6941),
    pulse
  );


  gl_FragColor = vec4(color, 1);
}