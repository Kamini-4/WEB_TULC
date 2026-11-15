function getSanitizedLocation() {
  try {
    const parsed = new URL(window.location.href);
    const sensitiveParams = ['key', 'passkey', 'token', 'reset_token', 'session', 'razorpay_signature'];
    sensitiveParams.forEach((param) => parsed.searchParams.delete(param));
    return parsed.toString();
  } catch {
    return window.location.origin + window.location.pathname;
  }
}

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-TULCLEAD01', {
  page_title: document.title,
  page_location: getSanitizedLocation(),
  send_page_view: true,
});
