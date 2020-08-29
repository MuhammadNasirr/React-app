export function getURLParameter(name) {
    return (
      decodeURIComponent(
        (new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(window.location.search) || [null, ''])[1],
      ) || null
    );
  }