<script lang="ts">
    import {CardState} from "./main";
    import Stack from "./Stack.svelte";
    import PlayCard from "./PlayCard.svelte";
    import {onMount} from "svelte";
    import startSound from "/TechTarot_Start.mp3";
    import table from "/Tisch.png";

    interface Card {
        name: string;
        id: string;
        state: CardState;
        drawn: boolean;
    }

    let counter = $state(0);
    let drawnCards = $state<Card[]>([]);
    let gameStarted = $state(false);
    let username = $state("");
    let audio: HTMLAudioElement;

    //todo: Tisch muss in den Hintergrund fitten
    onMount(() => {
        reset();
        const evtSource = new EventSource("http://localhost:8080/connect");
        evtSource.onmessage = (event) => {
            if (!event.data.includes("keepalive")) {
                console.log("Server send data: ", event.data);
                username = event.data;
                gameStarted = true;
                audio.play();
            }
        }
        evtSource.onerror = (error) => {
            console.log("error case:" + error);
        }
    })

    function next() {
        counter >= 3 ? reset() : draw();
    }

    function draw() {
        drawnCards[counter++].state = CardState.hidden
    }

    function reset() {
        fetch("http://localhost:8080/cards")
            .then(response => response.json())
            .then((cards: Card[]) => {
                drawnCards = cards.map(c => {
                    return {name: c.name, id: c.id, state: CardState.stack, drawn: false}
                });
            })
            .catch(error => console.log(error));
        counter = 0;
        gameStarted = false;
    }

    function getFlyAttributes(cardPosition: number): any {
        let stackRect = document.getElementById('stack')!.getBoundingClientRect();
        let cardRect = document.getElementById(`c-${cardPosition}`)!.getBoundingClientRect();
        return {
            x: -Math.abs(stackRect.x - cardRect.x),
            duration: (2000 / drawnCards.length) * (drawnCards.length - cardPosition)
        };
    }
</script>

<main>
    <audio src="{startSound}" bind:this={audio}></audio>
    {#if gameStarted}
        <section class="tech-tarot">
            {#if username}
                <span class="title">Es ist Zeit für deine Zukunft {username}</span>
                <div class="game-area">
                    <div class="your-future">
                        {#each drawnCards as card, i}
                            <div class="card placeholder">
                                {#if card.state !== CardState.stack}
                                    <PlayCard id={i} bind:card={drawnCards[i]}
                                              callback={getFlyAttributes(i)}></PlayCard>
                                {/if}
                            </div>
                        {/each}
                    </div>
                    <Stack {next}/>
<!--                    <img class="table" src="{table}">-->
                </div>
            {/if}
        </section>
    {/if}
</main>

<style>
    .tech-tarot {
        display: flex;
        gap: 48px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .title {
        font-size: 48px;
        font-weight: bold;
    }

    .game-area {
        display: flex;
        gap: 50px;
    }

    .table {
        position: absolute;
    }

    .your-future {
        display: flex;
        gap: 10px
    }

    .placeholder {
        background-color: transparent;
        border: 2px solid #575757;
        border-radius: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
