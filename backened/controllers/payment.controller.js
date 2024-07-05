const Razorpay = require("razorpay");
const crypto = require("crypto");


const order = async (req, res) =>{
    console.log("request body", req.body);
    try{
        const instance = new Razorpay({
            key_id: "rzp_test_1UwxfTo7kDTnG5",
            key_secret: "J188LsgVGBDXAE5F5ZyPMpKr"
        });

        const options = {
            amount: req.body.amount*100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        };

        instance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                return res.status(500).json({message: "Something went wrong!"});
            }

            res.json({data: order});
        })

    } catch(err){
        console.log(err);
        res.status(500).json({message: "Payment failed!"});
    }
}


//payment verify
const verifyPayment = async (req, res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const sign = razorpay_order_id+"|"+razorpay_payment_id;
    
    try{
        const expectedSign = crypto
        .createHmac("sha256", process.env.SECRET_KEY)
        .update(sign.toString())
        .digest("hex");

        if(razorpay_signature===expectedSign){
            return res.status(200).json({message: "Payment Verified"});
        } else{
            return res.status(400).json({message: "Invalid signature sent!"});
        }
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Verification failed"});
    }
}

module.exports = {order, verifyPayment};