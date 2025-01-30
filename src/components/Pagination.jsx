import React from "react";

function Pagination({ page, setPage }) {
  return (
    <div className="flex w-full justify-center">
      <div className="bg-gray-500 mt-6 w-[98%] py-[0.8rem] text-center rounded-md flex justify-center gap-16">
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            if (page !== 1) setPage(page - 1);
          }}>
         <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div className="font-bold">{page}</div>
        <div className="hover:cursor-pointer" onClick={() => setPage(page + 1)}>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
