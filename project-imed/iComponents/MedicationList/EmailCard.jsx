import React from 'react';

function EmailCard() {
  return (
    <div className="bg-gray-100 w-full p-12 flex flex-col justify-center bg-iListBg ">
      <div className="text-5xl font-bold mt-8 mb-4">Do not see your medication?</div>
      <p className="text-lg font-bold mb-8">
        We are always adding new medications into the dispensary. <br />
        Tell us what you are looking for.  <br />
        We will inform you the moment it becomes available
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div  >
    <h1 className="text-3xl font-bold">Enter Email Address</h1>
    <input
      type="email"
      placeholder="Your Email Address"
      className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-l-lg mb-4 focus:outline-none focus:ring focus:border-blue-400"
    />
    <button
      type="submit"
      className="bg-iSubmitBtn px-6 py-2 rounded-r-full text-lg"
    >
      Submit
    </button>
  </div>
  <div>
    <img
      src="/images/imed/pills-email-container.png"
      alt="Medication"
      className="w-full md:w-96 mt-6 rounded-lg scale-150"
    />
  </div>
</div>

      </div>
  );
}

export default EmailCard;
