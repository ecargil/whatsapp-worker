export default {
  async fetch(request) {
    const url = new URL(request.url);
    let q = url.searchParams.get('q') || '';

    // Limpiar todo excepto números y +
    let num = q.replace(/[^\d+]/g, '');

    // Convertir 00XX → +XX
    if (num.startsWith('00')) {
      num = '+' + num.slice(2);
    }

    // Quitar + para wa.me
    num = num.replace('+', '');

    if (!num) {
      return new Response('Número no válido', { status: 400 });
    }

    return Response.redirect('https://wa.me/' + num, 302);
  }
};