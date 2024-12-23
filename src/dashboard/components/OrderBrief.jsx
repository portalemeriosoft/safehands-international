import { useState } from "react";
import Moment from "react-moment";
import Floors from "./Floors";
import { time_display as time, getOrderStatus } from "../../utils";
import ThirdPartyPurchase from "./ThirdPartyPurchase";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Stars from "./Stars";
import CancelOrder from "./CancelOrder";
import ActionButton from "./Buttons";
import MarkCompleted from "./MarkCompleted";

import { useSelector } from "react-redux";
import { userState } from "../../store/userSlice";

const OrderBrief = ({ order, setOrder }) => {
  const cancelBookingConfirmation = useState(false);
  const markStatusConfirmation = useState(false);

  let remaining_payment = 0;

  if (order.payment && order.payment.payable_amount) {
    if (order.payment && order.payment.amount_paid) {
      remaining_payment =
        Number(order.payment.payable_amount) -
        Number(order.payment.amount_paid);
    } else {
      remaining_payment = Number(order.payment.payable_amount);
    }
  }

  let user = useSelector(userState);
  user = user.data;

  const direction = encodeURI(
    "https://www.google.com/maps/dir/?api=1&origin=" +
      order.location_for_pickup.title +
      "&destination=" +
      order.location_for_dropOff.title +
      "&travelmode=driving"
  );

  const paymentDirection =
    order.location_for_dropOff &&
    order.location_for_dropOff.title &&
    order.location_for_payment &&
    order.location_for_payment.title
      ? encodeURI(
          "https://www.google.com/maps/dir/?api=1&origin=" +
            order.location_for_dropOff.title +
            "&destination=" +
            order.location_for_payment.title +
            "&travelmode=driving"
        )
      : "";

  return (
    <div className="booking-details">
      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Driver</div>
          <div>David (Bolton)</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Customer</div>
          <div>{order.customer.name}</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Mission</div>
          <div>{order.service.description}</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Special Requirements</div>
          <div>{order.job_brief}</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>2 Agents Required?</div>
          <div>
            {order.available_help && order.available_help === 1 ? "No" : "Yes"}
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Location A, Date & time</div>
          <div>
            <a
              className="text-blue-600"
              target="_blank"
              rel="noreferrer"
              href={direction}
            >
              {order.location_for_pickup &&
                order.location_for_pickup.title &&
                order.location_for_pickup.title}
              <ArrowTopRightOnSquareIcon
                className="inline h-5 w-5 pb-1"
                aria-hidden="true"
              />
            </a>{" "}
            <br />
            <Moment format="DD-MMM-YY, h:mm A">
              {order.start_task_datetime}
            </Moment>
          </div>
        </div>
      </div>

      {order.location_for_dropOff &&
        order.location_for_dropOff.title !== "" && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Location B, Date & time</div>
              <div>
                <a
                  className="text-blue-600"
                  target="_blank"
                  rel="noreferrer"
                  href={direction}
                >
                  {order.location_for_dropOff &&
                    order.location_for_dropOff.title &&
                    order.location_for_dropOff.title}
                  <ArrowTopRightOnSquareIcon
                    className="inline h-5 w-5 pb-1"
                    aria-hidden="true"
                  />
                </a>{" "}
                <br />
                {order.end_task_datetime && (
                  <Moment format="DD-MMM-YY, h:mm A">
                    {order.end_task_datetime}
                  </Moment>
                )}
              </div>
            </div>
          </div>
        )}

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Large Items</div>
          <div>{order.big_items_count}</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>What Floor</div>
          <div>
            <Floors
              a={order.floor_on_location_a}
              b={order.location_for_dropOff ? order.floor_on_location_b : null}
            />
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Working Elevator</div>
          <div>
            {order.floor_on_location_a === 0 ? (
              <>Location A = Not Required</>
            ) : order.elevator_on_location_a === 1 ? (
              <>Location A = Yes</>
            ) : (
              <>Location A = No</>
            )}
            {!order.location_for_dropOff ? (
              <></>
            ) : order.floor_on_location_b === 0 ? (
              <>
                <br />
                Location B = Not Required
              </>
            ) : order.elevator_on_location_b === 1 ? (
              <>
                <br />
                Location B = Yes
              </>
            ) : (
              <>
                <br />
                Location B = Not Available
              </>
            )}
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Easy Parking</div>
          <div>
            {order.easy_parking_on_location_a === 1 ? (
              <>Location A = Yes</>
            ) : (
              <>Location A = No</>
            )}
            {!order.location_for_dropOff ? (
              <></>
            ) : order.easy_parking_on_location_b === 1 ? (
              <>
                <br />
                Location B = Yes
              </>
            ) : (
              <>
                <br />
                Location B = No
              </>
            )}
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Estimated number of trips in van</div>
          <div>{order.expected_no_of_trips}</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Estimated Travel Time</div>
          <div>{time(order.duration)}</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Estimated Working Time</div>
          <div>{time(order.expected_duration)}</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Payment Method</div>
          <div>
            {order.payment &&
              order.payment.description &&
              order.payment.description}
          </div>
        </div>
      </div>

      {order.location_for_payment &&
        order.location_for_payment.title !== "" && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Location C (For payment)</div>
              <div>
                <a
                  className="text-blue-600"
                  rel="noreferrer"
                  target="_blank"
                  href={paymentDirection}
                >
                  {order.location_for_payment &&
                    order.location_for_payment.title &&
                    order.location_for_payment.title}
                  <ArrowTopRightOnSquareIcon
                    className="inline h-5 w-5 pb-1"
                    aria-hidden="true"
                  />
                </a>{" "}
                <br />
              </div>
            </div>
          </div>
        )}

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Buying Item For Customer?</div>
          <div>
            {order.third_party_purchase ? (
              <ThirdPartyPurchase data={order.third_party_purchase} />
            ) : (
              "No"
            )}
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>20% Deposit Required</div>
          <div>
            {order.payment &&
            order.payment.mandatory &&
            order.payment.mandatory === 2
              ? "Yes"
              : "No"}
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Full Payment Required For Booking</div>
          <div>
            {order.payment &&
            order.payment.mandatory &&
            order.payment.mandatory === 1
              ? "Yes"
              : "No"}
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Total Quote for Booking</div>
          <div>
            £
            {order.payment &&
              order.payment.payable_amount &&
              order.payment.payable_amount}
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Amount Paid</div>
          <div>
            £
            {order.payment &&
              order.payment.amount_paid &&
              Number(order.payment.amount_paid).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Remaining Paid</div>
          <div>£{remaining_payment.toFixed(2)}</div>
        </div>
      </div>

      <div className="booking-item">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Order Status</div>
          <div>{getOrderStatus(order.status)}</div>
        </div>
      </div>

      {order.feedback && (
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Feedback</div>
            <div>
              <Stars count={order.feedback.rating} />
              {order.feedback.feedback && (
                <>
                  <br />
                  {order.feedback.feedback}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {order.status !== 4 && order.status !== 5 && (
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Action</div>
            <div>
              <ActionButton
                cancelBookingConfirmation={cancelBookingConfirmation}
                markStatusConfirmation={markStatusConfirmation}
                user={user}
                order={order}
              />
            </div>
          </div>
        </div>
      )}

      <CancelOrder
        order_id={order.id}
        setOrderBrief={setOrder}
        remaining_payment={remaining_payment}
        cancelBookingConfirmation={cancelBookingConfirmation}
      />
      <MarkCompleted
        order_id={order.id}
        setOrderBrief={setOrder}
        remaining_payment={remaining_payment}
        markStatusConfirmation={markStatusConfirmation}
      />
    </div>
  );
};

export default OrderBrief;
