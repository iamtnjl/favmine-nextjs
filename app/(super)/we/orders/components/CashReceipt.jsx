"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { formatCurrency, formatDateTime } from "@/common/helpers/UtilKit";

const CashReceipt = forwardRef(({ order }, ref) => {
  return (
    <div className="font-mono text-grey-700 p-4" ref={ref}>
      <header className="flex flex-col gap-1 justify-between items-start border-b-2 border-dashed border-grey-300 py-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold capitalize">HalalBazar</h2>
          <a href={`https://halalbazar.net`}>
            <span className="text-sm">{`https://halalbazar.net`}</span>
          </a>
        </div>
        <div>
          <div className="flex gap-2">
            <p className="text-sm font-bold">Address: </p>
            <p className="text-sm">ul.Słoneczna 6B 05-500 Stara Iwiczna</p>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between border-b-2 border-dashed border-grey-300 gap-2 py-2">
        <h1 className="font-bold text-xl">CASH RECEIPT</h1>
        <div className="text-right text-sm">
          <p>Order No # {order?.order_id}</p>
          <p>{formatDateTime(order?.createdAt, true)}</p>
        </div>
      </div>
      <div className="border-b-2 border-dashed border-grey-300 py-2">
        <div className="flex justify-between text-sm">
          <span className="font-bold">Customer&apos;s Name</span>{" "}
          <span>{order?.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Mobile No.</span> <span>{order?.phone}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Customer&apos;s Address</span>{" "}
          <address className="text-sm whitespace-pre-wrap">
            {`${order?.address?.street}, ${order?.address?.city}, ${order?.address?.zip}`}
          </address>
        </div>
      </div>

      <div className="border-b-2 border-dashed border-grey-300 py-2">
        <table className="w-full text-right">
          <thead>
            <tr className="pt-2">
              <th className="text-left text-sm">Product</th>
              <th className="text-sm">Qty</th>
              <th className="text-sm">Pri.</th>
              <th className="text-sm">Disc.</th>
              <th className="text-sm">Subt.</th>
            </tr>
          </thead>

          <tbody>
            {order?.products.map((item, i) => (
              <tr key={i} className="font-normal text-sm">
                <td className="text-left">{item?.product?.name}</td>
                <td>{item?.quantity}</td>
                <td>{formatCurrency(item?.price * item?.quantity, ",")}</td>
                <td>
                  {formatCurrency(
                    item?.price * item?.quantity -
                      item?.discount_price * item?.quantity,
                    ","
                  )}
                </td>
                <td>{formatCurrency(item?.total_price, ",")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-grey-700 font-normal border-b-2 border-dashed border-grey-300 py-2">
        <h2 className="font-semibold">Payment Breakdown</h2>
        <div>
          <div className="font-normal flex justify-between items-center">
            Sub Total:
            <h2 className="font-normal">
              <span className="text-grey-700 font-normal mr-1 text-sm">
                &#2547;
              </span>
              {formatCurrency(order?.sub_total, ",")}
            </h2>
          </div>
          <div className="font-normal flex justify-between items-center">
            Discount:
            <h2 className="font-normal">
              <span className="text-grey-700 font-normal mr-1 text-sm">
                − &#2547;
              </span>
              {formatCurrency(order?.discount, ",")}
            </h2>
          </div>
          <div className="font-semibold flex justify-between items-center">
            Total Order Price:
            <h2 className="font-semibold">
              <span className="text-grey-700 font-semibold mr-1 text-sm">
                &#2547;
              </span>
              {formatCurrency(order?.grand_total, ",")}
            </h2>
          </div>
        </div>
      </div>

      <div className="py-2">
        <h2 className="text-base font-bold text-center">
          Thank You For Shopping With HalalBazar
        </h2>
        <h2 className="text-xs text-center py-2">
          Please Contact {"+48 796 420 987"}
        </h2>
        <h2 className="text-xs text-center capitalize">HalalBazar</h2>
      </div>
      <div>
        <h2 className="text-xs text-center">
          HalalBazar ©️ {new Date().getFullYear()}
        </h2>
      </div>
    </div>
  );
});

CashReceipt.displayName = "CashReceipt";

export default CashReceipt;
