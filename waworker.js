export default {
  async fetch(request) {
    const url = new URL(request.url);
    let q = url.searchParams.get('q') || '';

    let num = q.replace(/[^\d+]/g, '');

    if (num.startsWith('00')) {
      num = '+' + num.slice(2);
    }

    num = num.replace('+', '');

    if (!num) {
      return new Response('Number not valid', { status: 400 });
    }

    return Response.redirect('https://web.whatsapp.com/send/?phone=' + num + '&text&type=phone_number&app_absent=0', 302);
  }
};