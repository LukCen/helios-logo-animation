import { Application, Container, Graphics } from "pixi.js";
import { OrbitSystem } from "./OrbitSystem";

export class OrbitRenderer {
  constructor(
    private system: OrbitSystem,
    private container: Container
  ) { }
  draw(app: Application) {
    // orbits
    this.system.orbits.forEach((o) => {
      const g = new Graphics().ellipse(0, 0, o.radius, o.radius).stroke({ width: o.width, color: o.color })
      g.pivot.set(0, 0)
      this.container.addChild(g)
    })
    // planets
    this.system.planets.forEach((p, i) => {
      const angle = p.angle
      const g = new Graphics().circle(0, 0, p.radius).fill(p.color)
      // the gap between orbit and planet - color of background by default
      const ring = new Graphics().ellipse(0, 0, p.radius, p.radius).stroke({ width: p.ringWidth, color: p.ringColor ?? "fff" })
      g.addChild(ring)
      // jesus christ
      const orbitRadius = this.system.orbits[0].radius
      g.x = orbitRadius * Math.cos(Math.floor(angle))
      g.y = orbitRadius * Math.sin(Math.floor(angle))

      this.container.addChild(g)

      // console.log(g.x, g.y)

      // if the planet is meant to be a ring, draw it so it has empty space inside
      if (p.isRing && p.ringWidth) {
        // const ring = new Graphics().ellipse(0, 0, p.radius, p.radius).stroke({ width: p.ringWidth, color: p.ringColor ?? "fff" })
        // g.addChild(ring)
        // console.log(`Drawn a circle: \n color: ${p.ringColor}\n width: ${p.ringWidth}`)
      }
    })
    app.stage.addChild(this.container)
  }
}
