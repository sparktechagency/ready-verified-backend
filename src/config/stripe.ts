import Stripe from "stripe";
import config from ".";


const stripe = new Stripe(config.stripe.secret_key!)

export default stripe;