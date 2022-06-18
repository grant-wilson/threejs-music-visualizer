import AudioMotionAnalyzer from 'audiomotion-analyzer';
import * as chroma from 'chroma-js';
import { map, maxBy, meanBy } from 'lodash-es';
import {
  AmbientLight,
  BoxBufferGeometry,
  Camera,
  Color,
  DirectionalLight,
  InstancedMesh,
  MeshLambertMaterial,
  Object3D,
  OrthographicCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

export class Visualizer {
  private _scene!: Scene;
  private _camera!: Camera;
  private _renderer!: WebGLRenderer;
  private _dummies!: Object3D[];
  private _in!: InstancedMesh;
  private _geom = new BoxBufferGeometry(1, 1, 1).translate(0, 0.5, 0);
  private _mat!: MeshLambertMaterial;
  private _ambientLight!: AmbientLight;
  private _ama: AudioMotionAnalyzer = new AudioMotionAnalyzer(undefined, {
    useCanvas: false,
    smoothing: 0.9,
    fftSize: 2 ** 14,
  });
  private readonly _gridSize = 26;

  constructor(
    private canvas: HTMLCanvasElement,
    private audio: HTMLAudioElement
  ) {}

  init() {
    this._ama.connectInput(this.audio);

    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;

    this._scene = new Scene();

    const fullHeightAdjustment = 9.25;

    this._camera = new OrthographicCamera(
      -18.3848,
      18.3848,
      11.0227 + 0.75 + 5.7 + fullHeightAdjustment,
      -11.0227 + 0.75,
      0,
      1000
    );
    this._camera.position.set(30, 30, 30);
    this._camera.lookAt(new Vector3(0, 0, 0));

    // GEOMETRY
    this._mat = new MeshLambertMaterial({ color: 0xffffff });
    const instancedBoxes = new InstancedMesh(
      this._geom,
      this._mat,
      this._gridSize ** 2
    );

    this._dummies = [];

    const colors = chroma
      .scale([
        'white',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'black',
      ])
      .colors(this._gridSize ** 2);

    for (let x = -this._gridSize / 2; x <= this._gridSize / 2; x++) {
      for (let z = -this._gridSize / 2; z < this._gridSize / 2; z++) {
        const y = Math.abs(x % 2) == 1 ? z : -z - 1;
        const i =
          (x + this._gridSize / 2) * this._gridSize + y + this._gridSize / 2;
        const dummy = new Object3D();
        dummy.position.set(x + 0.5, 0.5, y + 0.5);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        this._dummies.push(dummy);
        instancedBoxes.setMatrixAt(i, dummy.matrix);
        instancedBoxes.setColorAt(i, new Color(colors[i]));
      }
    }

    this._scene.add(instancedBoxes);
    this._in = instancedBoxes;

    // LIGHTS
    const directionalLight = new DirectionalLight(0xfffffff, 0.7);
    directionalLight.position.set(0.75, 0.75, 1.0).normalize();
    this._scene.add(directionalLight);

    this._ambientLight = new AmbientLight(0xcccccc, 0.5);
    this._scene.add(this._ambientLight);

    // RENDERER
    this._renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas,
    });
    this._renderer.setClearColor(0xffffff, 0);

    this.setSize(width, height);
  }

  setSize(width: number, height: number) {
    const aspectRatio = 36.7696 / 38.4954; // w/h

    if (width > height) {
      this._renderer.setSize(width, width / aspectRatio);
    } else {
      this._renderer.setSize(height * aspectRatio, height);
    }
  }

  start() {
    requestAnimationFrame(this.start.bind(this));

    const mappedBars = this._mapAnalyzerBars();

    for (let i = 0; i < this._dummies.length; i++) {
      const dummy = this._dummies[i];
      const bar = mappedBars[i];
      const scale = (isNaN(bar) ? 0 : bar) * 9;
      dummy.scale.y = 1 + scale;
      dummy.updateMatrix();
      this._in.setMatrixAt(i, dummy.matrix);
    }

    this._in.instanceMatrix.needsUpdate = true;
    this._renderer.render(this._scene, this._camera);
  }

  resize(width: number, height: number) {
    this.setSize(width, height);
    this._renderer.render(this._scene, this._camera);
  }

  private _mapAnalyzerBars() {
    const bars: any[][] = [[]];
    let freq = 0;
    let i = 0;

    const abars = this._ama.getBars();
    const maxX = maxBy(abars, 'posX')?.posX;
    const step = (1.0 * (maxX ?? 0)) / this._gridSize ** 2.0;

    for (const bar of this._ama.getBars()) {
      if (bar.posX > freq + step) {
        i++;
        bars.push([]);
        freq += step;
      }
      bars[i].push(bar);
    }

    const b2 = map(bars, (bar) => meanBy(bar, (b) => b.value[0]));
    return b2;
  }
}
