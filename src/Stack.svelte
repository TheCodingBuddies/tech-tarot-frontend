<script lang="ts">
    let {next} = $props()
</script>

<div class="card-stack" id="stack" role="button" tabindex="0" onclick={next} onkeydown={next}>
    <div class="card pattern card-3"></div>
    <div class="card pattern card-2"></div>
    <div class="card pattern card-1"></div>
</div>

<style>
    .card-stack {
        position: relative;
        background-color: transparent;
        border: none;
        width: 6cm;
    }

    .card-1 {
        position: absolute;
        top: 0;
        left: 0;
        rotate: 4deg;
    }

    .card-2 {
        position: absolute;
        top: 3px;
        left: 3px;
        rotate: 10deg;
    }

    .card-3 {
        position: absolute;
        top: 6px;
        left: 6px;
        rotate: 1deg;
    }
</style>