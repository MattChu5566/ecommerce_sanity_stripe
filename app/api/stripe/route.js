const stripe = require('stripe').Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const cartItems = await req.json();
    //console,log(cartItems[0].image[0].asset._ref)
    try {
        // Create Checkout Sessions from body params.
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1NI61gBZGtgSrLDVB9MqTMik'},
                {shipping_rate: 'shr_1NI62vBZGtgSrLDVlvozYTa2'}
            ],
            line_items: cartItems.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/mvlqu85d/production/').replace('-jpg', '.jpg');
                return {
                  price_data: { 
                    currency: 'TWD',
                    product_data: { 
                      name: item.name,
                      images: [newImage],
                    },
                    unit_amount: item.price * 100,
                  },
                  adjustable_quantity: {
                    enabled:true,
                    minimum: 1,
                  },
                  quantity: item.quantity
                }
              }),
            success_url: `${req.headers.get('origin')}/success`,
            cancel_url: `${req.headers.get('origin')}`,
        };
        
        const session = await stripe.checkout.sessions.create(params);
        return new Response(`${JSON.stringify(session)}`, {status: 200});
        //res.redirect(`${session.url}`, 303)
    } catch (err) {
        //res.status(err.statusCode || 500).json(err.message);
        return new Response(`${err.messege}`, {status:200, statusText: 'Error on connection to STRIPE'});
    }   
}