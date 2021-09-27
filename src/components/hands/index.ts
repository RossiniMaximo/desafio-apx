import { state } from "../../state"
class Hands extends HTMLElement {
    move: "piedra" | "papel" | "tijeras"
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        state.suscribe(() => {
            this.handsLogic()

        })
        this.syncWithState();
        this.handsLogic();
    }
    syncWithState() {
        const lastState = state.getState();
        this.move = lastState.playerMove
        this.render()
    }
    handsLogic() {
        const lastState = state.getState();
        const piedraId = this.shadow.querySelector("#piedra")
        piedraId.addEventListener("click", () => {
            piedraId.classList.remove("blur")
            tijerasId.classList.add("blur")
            papelId.classList.add("blur")
            state.setMove("piedra")
            state.setState({
                ...lastState,

            })
            /* console.log("piedra", state.data.currentGame.playerMove); */
        })
        const papelId = this.shadow.querySelector("#papel")
        papelId.addEventListener("click", (e) => {
            papelId.classList.remove("blur")
            piedraId.classList.add("blur")
            tijerasId.classList.add("blur")
            state.setMove("papel")
            state.setState({
                ...lastState,

            })
            /* console.log("papel", state.data); */
        })
        const tijerasId = this.shadow.querySelector("#tijeras");
        tijerasId.addEventListener("click", () => {
            tijerasId.classList.remove("blur")
            papelId.classList.add("blur")
            piedraId.classList.add("blur")
            state.setMove("tijeras")
            state.setState({
                ...lastState,

            })
            /* console.log("tijeras", state.data); */
        })
    }
    render() {
        const piedraURL = require("url:../../images/piedra.png");
        const papelURL = require("url:../../images/papel.png");
        const tijerasURL = require("url:../../images/tijera.png");
        const div = document.createElement('div');
        div.className = "container"
        div.innerHTML = `
        <img class="img piedra borde" id="piedra" src="${piedraURL}">
        <img class="img papel" id="papel" src="${papelURL}">
        <img class="img tijeras" id="tijeras" src="${tijerasURL}">
        `;
        const style = document.createElement('style');
        style.innerHTML = `
        .container{
            display : flex;
            gap : 25px;
        }
        .img{
            height : 150px;
            display : block
        }
        .blur{filter: blur(4px); transition: all 0.15s;}
        .blur:hover{
            transform: translate3d(0px,-2px,0px);
        }
        `

        div.appendChild(style);
        this.shadow.appendChild(div);
    }
}
customElements.define("rps-hands", Hands);