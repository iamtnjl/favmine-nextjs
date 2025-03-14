function ProfileInfo({ data }) {
  return (
    <div className="border border-grey-300 rounded-md px-4 py-3 flex justify-between items-center bg-white mt-2">
      <div className="flex flex-col gap-2">
        <p className="text-base font-bold text-grey-700">{data?.name}</p>
        <p className="text-sm text-grey-700">{data?.phone}</p>
        <p className="text-sm text-grey-400">
          Our Deliverer will contact this name & phone number.
        </p>
      </div>
    </div>
  );
}

export default ProfileInfo;
