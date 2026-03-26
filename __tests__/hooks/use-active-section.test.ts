import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useActiveSection } from "@/hooks/use-active-section";

// ---- MOCK INTERSECTION OBSERVER ----

let observeMock: any;
let disconnectMock: any;
let callbackRef: any;

class MockIntersectionObserver {
  constructor(callback: any) {
    callbackRef = callback;
    observeMock = vi.fn();
    disconnectMock = vi.fn();
  }

  observe = (element: Element) => {
    observeMock(element);
  };

  disconnect = () => {
    disconnectMock();
  };
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver as any);

// ---- HELPERS ----

const createSection = (id: string) => {
  const el = document.createElement("div");
  el.id = id;

  // mock getBoundingClientRect (used in hook)
  el.getBoundingClientRect = vi.fn(() => ({
    top: 100,
    height: 200,
  })) as any;

  document.body.appendChild(el);
  return el;
};

const triggerIntersection = (entries: any[]) => {
  act(() => {
    callbackRef(entries);
  });
};

// ---- TESTS ----

describe("useActiveSection", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();

    // reset scroll
    Object.defineProperty(window, "scrollY", {
      value: 100,
      writable: true,
    });

    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    });

    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      writable: true,
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  // Test: returns correct section when visible
  it("returns correct section ID when a section is in view", () => {
    createSection("features");

    const { result } = renderHook(() => useActiveSection(["features"]));

    triggerIntersection([
      {
        target: document.getElementById("features"),
        isIntersecting: true,
      },
    ]);

    expect(result.current).toBe("features");
  });

  // Test: updates when user scrolls to different section
  it("updates when user scrolls to a different section", () => {
    createSection("features");
    createSection("ecosystem");

    const { result } = renderHook(() => useActiveSection(["features", "ecosystem"]));

    // first section visible
    triggerIntersection([
      {
        target: document.getElementById("features"),
        isIntersecting: true,
      },
    ]);

    expect(result.current).toBe("features");

    // switch visibility
    triggerIntersection([
      {
        target: document.getElementById("features"),
        isIntersecting: false,
      },
      {
        target: document.getElementById("ecosystem"),
        isIntersecting: true,
      },
    ]);

    expect(result.current).toBe("ecosystem");
  });

  // Test: handles no sections visible
  it("returns null when no sections are visible", () => {
    createSection("features");

    const { result } = renderHook(() => useActiveSection(["features"]));

    triggerIntersection([
      {
        target: document.getElementById("features"),
        isIntersecting: false,
      },
    ]);

    expect(result.current).toBe(null);
  });

  // Test: cleanup disconnects observer
  it("disconnects observer on unmount", () => {
    createSection("features");

    const { unmount } = renderHook(() => useActiveSection(["features"]));

    unmount();

    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
