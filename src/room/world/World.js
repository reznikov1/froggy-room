import Experience from "../Experience";
import Room from "./Room";
import WindowContent from "./WindowContent";
import Dust from "./Dust";
import BathWater from "./Water";
import CoffeeSteam from "./CoffeeSteam";
import ComputerScreen from "./ComputerScreen";
import Environment from "./Environment";
import * as THREE from 'three'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.room = new Room()
            this.dust = new Dust()
            this.water = new BathWater()
            // this.window = new Window()
            this.windowContent = new WindowContent()
            this.coffeeSteam = new CoffeeSteam()
            this.environment = new Environment()
            this.computerScreen = new ComputerScreen()



        })
    }



    update() {
        if (this.coffeeSteam) {
            this.coffeeSteam.update()
        }
        if (this.room) {
            this.room.update()
        }

        if (this.computerScreen) {
            this.computerScreen.update()
        }
        
        if (this.windowContent) {
            this.windowContent.update()
        }

        if (this.dust) {
            this.dust.update()
        }

        if (this.water) {
            this.water.update()
        }
    }
}