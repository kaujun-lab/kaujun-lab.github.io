(function () {
  function buildAffiliatePayload(product) {
    return {
      product_id: product.id,
      product_title: product.title,
      merchant: product.merchant,
      category: product.category,
      short_title: product.shortTitle
    };
  }

  function trackAffiliateClick(product) {
    var payload = buildAffiliatePayload(product);

    if (typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", payload);
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: "affiliate_click" }, payload));
    }

    if (window.analytics && typeof window.analytics.track === "function") {
      window.analytics.track("affiliate_click", payload);
    }

    return payload;
  }

  window.KaujunAnalytics = {
    buildAffiliatePayload: buildAffiliatePayload,
    trackAffiliateClick: trackAffiliateClick
  };
}());
