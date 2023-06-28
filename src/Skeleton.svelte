<div class="skeleton">
  <div class="skeleton-icon" />
  <div class="skeleton-text" />
  <div class="skeleton-text" />
  <div class="skeleton-text" />
  <div class="skeleton-line" />
  <div class="skeleton-rect" />
  <!-- Repeat the above lines as necessary for your layout -->
</div>

<style>
  .skeleton {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .skeleton-icon,
  .skeleton-line,
  .skeleton-text,
  .skeleton-rect {
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    animation: 1.5s shine linear;
  }

  .skeleton-icon {
    width: 5rem;
    height: 5rem;
    margin-bottom: 3rem;
  }

  .skeleton-line {
    width: 100%;
    height: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .skeleton-text {
    width: 16rem;
    height: 3rem;
  }

  .skeleton-rect {
    width: 16rem;
    height: 8rem;
  }

  @keyframes pulse {
    0% {
      background-color: #eee;
    }
    50% {
      background-color: #ddd;
    }
    100% {
      background-color: #eee;
    }
  }
</style>
