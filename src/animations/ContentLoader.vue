<style scoped>
  .card {
    width: 100%;
    padding: 1rem;
    text-align: center;
    border-radius: .8rem;
    background-color: white;
  }

  .card__skeleton {
    background-image: linear-gradient(
			90deg,
			#ccc 0px,
			rgb(229 229 229 / 90%) 40px,
			#ccc 80px
		);
    background-size: 300%;
    background-position: 100% 0;
    border-radius: inherit;
    animation: shimmer 1.5s infinite;
  }

  .card__title {
    height: 15px;
    margin-bottom: 15px;
  }

  .card__description {
    height: 100px;
  }

  @keyframes shimmer {
    to {
      background-position: -100% 0;
    }
  }
</style>

<template>
  <div class="card">
    <div class="card__skeleton card__title"></div>
    <div class="card__skeleton card__description"></div>
  </div>
</template>
