"use strict";
class ControlTower {
    constructor() { }
    static getInstance() {
        if (!ControlTower.instance) {
            ControlTower.instance = new ControlTower;
        }
        return ControlTower;
    }
}
