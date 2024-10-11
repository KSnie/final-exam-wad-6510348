import Customer from "@/models/Customer";

// curl -X POST -d '{"name":"p123","dob":"1990-01-01","membernumber":1234,"interest":"sports"}' localhost:3000/api/customer

export async function POST(req) {
  try {
    const body = await req.json();
    const newCustomer = new Customer(body);
    await newCustomer.save();

    return new Response(JSON.stringify(newCustomer), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating customer", error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// curl -X GET localhost:3000/api/customer
export async function GET(req) {
    try {
      const customers = await Customer.find({});
  
      return new Response(JSON.stringify(customers), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Error fetching customers", error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

//   curl -X PUT -d '{"_id": "__OBJECT_ID__", "updateData": {"name":"John Doe","dob":"1985-05-20","membernumber":5678,"interest":"art"}}' localhost:3000/api/customer
