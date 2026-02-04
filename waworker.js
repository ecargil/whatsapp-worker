export default {
  async fetch(request) {
    const url = new URL(request.url);
    const action = url.searchParams.get('action') || 'wchat';
    let q = url.searchParams.get('q') || '';

    let num = q.replace(/[^\d+]/g, '');

    if (num.startsWith('00')) {
      num = '+' + num.slice(2);
    }

    num = num.replace('+', '');

    if (!num) {
      return new Response('Number not valid', { status: 400 });
    }

    let redirectUrl;
    
    switch(action) {
      case 'wchat':
        redirectUrl = 'https://web.whatsapp.com/send/?phone=' + num + '&text&type=phone_number&app_absent=0';
        break;
      case 'wcall':
        redirectUrl = 'https://wa.me/' + num + '?call';
        break;
      case 'call':
        redirectUrl = 'tel:' + num;
        break;
      default:
        redirectUrl = 'https://web.whatsapp.com/send/?phone=' + num + '&text&type=phone_number&app_absent=0';
    }

    return Response.redirect(redirectUrl, 302);
  }
};