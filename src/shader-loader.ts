import axios from 'axios';

const shaders = [
  'earth-fragment.glsl',
  'earth-vertex.glsl',
  'dot-fragment.glsl',
  'dot-vertex.glsl',
  'dot-vertex2.glsl',
  'pick-fragment.glsl',
  'pick-vertex.glsl',
  'path-fragment.glsl',
  'path-vertex.glsl'
];

const shaderData: Record<string, string> = {};
const basePath = '/shaders';

async function loadShader (name: string): Promise<void> {
  console.debug(`Loading shader ${name}`);
  const response = await axios.get(`${basePath}/${name}`);
  shaderData[name] = response.data;
}

async function loadShaders (): Promise<void> {
  for (let i = 0; i < shaders.length; i++) {
    try {
      await loadShader(shaders[i]);
    } catch (error) {
      console.error(`Failed to load shader ${shaders[i]}`, error);
    }
  }
}

function getShaderCode (name: string): string {
  return shaderData[name] as string;
}

export default {
  loadShaders,
  getShaderCode
};

export { loadShaders, getShaderCode };
