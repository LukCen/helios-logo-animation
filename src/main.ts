import { Application, Container, Renderer } from "pixi.js";
import { Orbit, OrbitSystem, Planet } from "./OrbitSystem";
import { OrbitRenderer } from "./OrbitRender";

const LOGO_MAIN_COLOR: string = "00E2FF";
const LOGO_GRADIENT: string[] = ["00E2FF", "00AFF5"]
export const BG_COLOR: string = "#000";


export interface Config {
  app: Application<Renderer> | null,
  orbitData: Record<string, string | number>
  planetData: Record<string, string | number>
}

const logoConfig: Config = {
  app: null, // null by default, set this param to Application instance created by Pixi
  orbitData: {
    baseRadius: 225, // this is the outermost orbit - if creating more than one, subtract gap value from this
    gap: 80, // distance from each orbit
    width: 8, // width of the orbit
    color: "00E2FF" // color of the orbit
  },
  planetData: {
    amount: 1, // how many planets to generate on a single orbit,
    radius: 30
  }
};

(async () => {
  const app = new Application();

  await app.init({ background: BG_COLOR, width: 512, height: 512, antialias: true });

  document.querySelector("#pixi-container")!.appendChild(app.canvas);

  // TESTING FOR CLASS BASED APPROACH
  const system1Container = new Container({ x: app.screen.width / 2, y: app.screen.height / 2 })
  const system2Container = new Container({ x: app.screen.width / 2, y: app.screen.height / 2 })
  const system3Container = new Container({ x: app.screen.width / 2, y: app.screen.height / 2 })
  const outerRadius = 225
  const middleRadius = outerRadius - 80
  const innerRadius = middleRadius - 80

  const planetRadius = 20

  // OUTER
  logoConfig.app = app
  const system1 = new OrbitSystem(system1Container, logoConfig)
  const system1_renderer = new OrbitRenderer(system1, system1Container)
  const system1_orbit = new Orbit(outerRadius, 8, LOGO_MAIN_COLOR)
  const system1_planet = new Planet(planetRadius, LOGO_MAIN_COLOR, false, 0)
  const system1_planet_2 = new Planet(planetRadius, LOGO_MAIN_COLOR, false, 135)
  system1.addOrbit(system1_orbit)
  system1.addPlanet(system1_planet)
  system1.addPlanet(system1_planet_2)

  // MIDDLE

  const system2 = new OrbitSystem(system2Container, logoConfig)
  const system2_renderer = new OrbitRenderer(system2, system2Container)
  const system2_orbit = new Orbit(middleRadius, 8, LOGO_MAIN_COLOR)
  const system2_planet = new Planet(planetRadius, LOGO_MAIN_COLOR, false, 33)
  const system2_planet_2 = new Planet(planetRadius, LOGO_MAIN_COLOR, true, 11, BG_COLOR, 10)
  system2.addOrbit(system2_orbit)
  system2.addPlanet(system2_planet)
  system2.addPlanet(system2_planet_2)


  const system3 = new OrbitSystem(system3Container, logoConfig)
  const system3_renderer = new OrbitRenderer(system3, system3Container)
  const system3_orbit = new Orbit(innerRadius, 8, LOGO_MAIN_COLOR)
  const system3_planet = new Planet(planetRadius, LOGO_MAIN_COLOR, true, 70)
  const system3_planet2 = new Planet(planetRadius, LOGO_MAIN_COLOR, false, 73)

  system3.addOrbit(system3_orbit)
  system3.addPlanet(system3_planet)
  system3.addPlanet(system3_planet2)

  system1_renderer.draw(app)
  system2_renderer.draw(app)
  system3_renderer.draw(app)

  app.ticker.add((time) => {
    system1Container.rotation += 0.1 * time.deltaTime / 3
    system2Container.rotation -= 0.1 * time.deltaTime / 2.5
    system3Container.rotation += 0.1 * time.deltaTime / 2
  })

})();
