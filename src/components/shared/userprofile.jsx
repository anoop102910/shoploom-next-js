import React from "react";

function TaskCard() {
  return (
    <div>
      <div className="shadow-lg rounded-xl w-72 md:w-96 p-4 bg-white relative overflow-hidden">
        <a href="#" className="w-full h-full block">
          <div className="flex items-center border-b-2 mb-2 py-2">
            <img
              className="w-10 h-10 object-cover rounded-full"
              alt="User avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            />

            <div className="pl-3">
              <div className="font-medium">Jessica White</div>
              <div className="text-gray-600 text-sm">Sr. Forntend Developer</div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-gray-800 text-sm font-medium mb-2">Working On:</p>
            <p className="text-gray-800 text-xl font-medium mb-2">
              Improve css design of the carousel
            </p>
            <p className="text-blue-600 text-xs font-medium mb-2">Due: Sunday, 23 August</p>
            <p className="text-gray-400 text-sm mb-4">
              You’ve been coding for a while now and know your way around...
            </p>
          </div>
          <div className="flex items-center justify-between my-2">
            <p className="text-gray-300 text-sm">4/6 task completed</p>
          </div>
          <div className="w-full h-2 bg-blue-200 rounded-full">
            <div className="w-2/3 h-full text-center text-xs text-white bg-blue-600 rounded-full"></div>
          </div>
        </a>
      </div>
      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a
            title="Follow me on twitter"
            href="https://www.twitter.com/asad_codes"
            target="_blank"
            className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          >
            <img
              className="object-cover object-center w-full h-full rounded-full"
              src="https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2019/12/twitter-logo.jpg"
              alt="Twitter logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
