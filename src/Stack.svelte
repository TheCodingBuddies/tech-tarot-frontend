<script lang="ts">
    let {callback} = $props()
</script>

<div class="card-stack" id="stack" role="button" tabindex="0" onclick={callback} onkeydown={callback}>
    <div class="card pattern card-3"></div>
    <div class="card pattern card-2"></div>
    <div class="card pattern card-1"></div>
</div>

<style>
    .card {
        height: 9cm;
        width: 6cm;
        border-radius: 12px;
        border: 2px solid red;
    }

    .pattern {
        width: 100%;
        height: 100%;
        background-color: #575957;
        opacity: 1;
        background: radial-gradient(circle, transparent 20%, #575957 20%, #575957 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #575957 20%, #575957 80%, transparent 80%, transparent) 37.5px 37.5px, linear-gradient(#015100 3px, transparent 3px) 0 -1.5px, linear-gradient(90deg, #015100 3px, #575957 3px) -1.5px 0;
        background-size: 75px 75px, 75px 75px, 37.5px 37.5px, 37.5px 37.5px;
    }

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