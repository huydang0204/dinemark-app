"use client";

export default function Error(props: { error: string }) {
  return <div className="bold text-red-500 ">Error: {props.error}</div>;
}
