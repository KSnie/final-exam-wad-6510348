import Customer from "@/models/Customer";

// curl -X GET localhost:3000/api/customer/__OBJECT_ID__

export async function GET(req, { params }) {
    try {
      const { id } = params;
  
      const customer = await Customer.findById(id);
      if (!customer) {
        return new Response(JSON.stringify({ message: "Customer not found" }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify(customer), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Error fetching customer", error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

// curl -X DELETE localhost:3000/api/customer/__OBJECT_ID__

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: "Customer deleted successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting customer", error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    
    // Log the raw request body for debugging
    const requestBody = await req.json();
    console.log("Received requestBody:", requestBody);
    
    const { updateData } = requestBody; // Access updateData directly

    // Log incoming data
    console.log("Received updateData:", updateData);

    // Ensure updateData is defined
    if (!updateData) {
      throw new Error("updateData is required");
    }

    // Fix the date to ensure it's a Date object
    if (updateData.dob) {
      updateData.dob = new Date(updateData.dob); // Convert string to Date object
      if (isNaN(updateData.dob.getTime())) {
        throw new Error("Invalid date format");
      }
    }

    // Convert membernumber to number
    if (updateData.membernumber) {
      updateData.membernumber = Number(updateData.membernumber);
    }

    // Remove _id from the updateData object to prevent conflicts
    delete updateData._id;

    // Update customer in the database
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Validate against schema
    });

    // Log updated customer data
    console.log("updatedCustomer:", updatedCustomer);

    if (!updatedCustomer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updatedCustomer), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating customer:", error); // Log the error for debugging
    return new Response(JSON.stringify({ message: "Error updating customer", error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}



export async function PATCH(req, { params }) {
  try {

    const { id } = params;
    const updateData = await req.json();


    const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCustomer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updatedCustomer), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error modifying customer", error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}