"use client"
import React, { useEffect, useRef } from "react";

type ResizableConfig = {
  leftId: string;
  handWrapSelector: string;
  mouthSelector: string;
};

export default function CatScript({
  leftId,
  handWrapSelector,
  mouthSelector,
}: ResizableConfig) {
  const isResizing = useRef(false);
  const lastDownX = useRef(0);

  useEffect(() => {
    const left = document.getElementById(leftId);
    const catHand = document.querySelector(handWrapSelector) as HTMLElement;

    if (!left) {
      console.error("Invalid configuration: left elements are missing");
      return;
    }
    if (!catHand) {
      console.error("Invalid configuration: catHand elements are missing");
      return;
    }

    const onMouseDown = (e: MouseEvent) => {
      isResizing.current = true;
      lastDownX.current = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      catHand.style.width = `${left.clientWidth}px`;

      if (left.clientWidth < 270) {
        left.className = "closing";
        catHand.style.width = `${left.clientWidth}px`;
        const handWrap = document.querySelector(".hand-wrap") as HTMLElement;
        if (handWrap) {
          handWrap.style.width = `${left.clientWidth}px`;
        }
      } else {
        left.className = "";
        catHand.removeAttribute("style");
        const handWrap = document.querySelector(".hand-wrap") as HTMLElement;
        if (handWrap) {
          handWrap.removeAttribute("style");
        }
      }

      const mouth = document.querySelector(mouthSelector) as HTMLElement;
      if (mouth) {
        mouth.style.display = left.clientWidth < 170 ? "block" : "none";
      }
    };

    const onMouseUp = () => {
      isResizing.current = false;
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [leftId, handWrapSelector, mouthSelector]);

  return null; // This is a utility hook-like component, so no JSX is rendered.
}
