"use client";

import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return <CountUp className="w-full" end={amount} decimals={2} duration={0.7} decimal="," prefix="$"/>;
};

export default AnimatedCounter;
