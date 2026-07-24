"use client";

import { useLayoutEffect, useEffect } from "react";
import { isClient } from "@/lib/utils";

/**
 * useLayoutEffect on client, useEffect on server to avoid SSR warnings.
 */
export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;
