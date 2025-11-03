class DonationManager {
  constructor() {
    this.bannerShown = false;
    this.donationUrls = {
      buymeacoffee: 'https://buymeacoffee.com/kderbyma',
      patreon: 'https://patreon.com/kderbyma',
      github: 'https://github.com/sponsors/ConflictingTheories',
      ko_fi: 'https://ko-fi.com/kderbyma'
    };

    this.init();
  }

  init() {
    this.loadDonationState();
    this.setupEventListeners();
    this.showBannerIfNeeded();
  }

  loadDonationState() {
    const donationState = localStorage.getItem('donationState');
    if (donationState) {
      const state = JSON.parse(donationState);
      this.bannerShown = state.bannerShown || false;
      this.lastDonationDate = state.lastDonationDate;
      this.donationCount = state.donationCount || 0;
    }
  }

  saveDonationState() {
    const state = {
      bannerShown: this.bannerShown,
      lastDonationDate: this.lastDonationDate,
      donationCount: this.donationCount,
      lastShown: new Date().toISOString()
    };
    localStorage.setItem('donationState', JSON.stringify(state));
  }

  setupEventListeners() {
    // Show floating button when scrolling
    window.addEventListener('scroll', this.handleScroll.bind(this));

    // Track outbound donation clicks
    document.addEventListener('click', this.trackDonationClick.bind(this));
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const floatingBtn = document.getElementById('floatingDonation');
    const banner = document.getElementById('donationBanner');

    if (scrollY > 300 && banner.classList.contains('hidden')) {
      floatingBtn.classList.remove('hidden');
    } else {
      floatingBtn.classList.add('hidden');
    }
  }

  showBannerIfNeeded() {
    // Show banner if:
    // 1. Never shown before, OR
    // 2. Last shown more than 7 days ago, OR
    // 3. User has used app multiple times
    const shouldShow = !this.bannerShown ||
                      this.shouldShowBasedOnUsage() ||
                      this.isFirstTimeAfterUpdate();

    if (shouldShow) {
      this.showDonationBanner();
    }
  }

  shouldShowBasedOnUsage() {
    const appUsage = localStorage.getItem('appUsageCount');
    return appUsage && parseInt(appUsage) > 10; // Show after 10 uses
  }

  isFirstTimeAfterUpdate() {
    const lastVersion = localStorage.getItem('lastAppVersion');
    const currentVersion = '1.1.0'; // Update this with each version
    return lastVersion !== currentVersion;
  }

  showDonationBanner() {
    const banner = document.getElementById('donationBanner');
    const floatingBtn = document.getElementById('floatingDonation');

    banner.classList.remove('hidden');
    floatingBtn.classList.add('hidden');
    this.bannerShown = true;
    this.saveDonationState();

    // Track banner view
    this.trackEvent('donation_banner_view');
  }

  hideDonationBanner() {
    const banner = document.getElementById('donationBanner');
    banner.classList.add('hidden');
    this.bannerShown = true;
    this.saveDonationState();

    // Track banner dismiss
    this.trackEvent('donation_banner_dismiss');
  }



  trackDonationClick(event) {
    const link = event.target.closest('a');
    if (link && link.classList.contains('donation-link')) {
      const platform = this.getPlatformFromUrl(link.href);
      this.trackEvent('donation_link_click', { platform });
      this.recordDonationAttempt();
    }
  }

  getPlatformFromUrl(url) {
    if (url.includes('buymeacoffee')) return 'buymeacoffee';
    if (url.includes('patreon')) return 'patreon';
    if (url.includes('paypal')) return 'paypal';
    if (url.includes('github')) return 'github';
    if (url.includes('ko-fi')) return 'ko_fi';
    return 'other';
  }

  recordDonationAttempt() {
    this.donationCount = (this.donationCount || 0) + 1;
    this.lastDonationDate = new Date().toISOString();
    this.saveDonationState();
  }

  trackEvent(eventName, data = {}) {
    // Simple analytics - you can integrate with Google Analytics later
    const analytics = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...data
    };

    console.log('Donation Event:', analytics);

    // Save to localStorage for basic tracking
    const events = JSON.parse(localStorage.getItem('donationEvents') || '[]');
    events.push(analytics);
    localStorage.setItem('donationEvents', JSON.stringify(events));
  }
}

// Initialize donation manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.donationManager = new DonationManager();
});
