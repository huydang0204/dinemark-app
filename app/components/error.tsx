"use client"

export default function Error(props: { error: string }) {
  return <div>Error: {props.error}</div>
}