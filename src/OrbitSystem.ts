import { Container, Graphics } from "pixi.js"
import { Config, BG_COLOR } from "./main"

export class Orbit {
  constructor(
    public radius: number,
    public width: number,
    public color: string,
  ) { }
}

export class Planet extends Graphics {
  constructor(
    public radius: number,
    public color: string,
    public isRing: boolean,
    angle: number,
    public ringColor: string = BG_COLOR,
    public ringWidth: number = 10,
    x: number = 0,
    y: number = 0,
  ) {
    super()
    this.x = x
    this.y = y
    this.angle = angle
  }
}

export class OrbitSystem {
  constructor(
    public container: Container,
    public config: Config,
  ) { }
  orbits: Orbit[] = []
  planets: Planet[] = []

  addOrbit(orbit: Orbit) {
    this.orbits.push(orbit)
  }

  addPlanet(planet: Planet) {
    this.planets.push(planet)
  }

}


