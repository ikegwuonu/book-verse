"use client";

export function Find() {
  const handleFindClick = () => {
    try {
      // For cross-browser compatibility
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const event = new KeyboardEvent("keydown", {
        key: "f",
        ctrlKey: !isMac,
        metaKey: isMac,
        bubbles: true,
        cancelable: true,
      });

      document.dispatchEvent(event);
    } catch (error) {
      console.error("Failed to trigger find:", error);
      // Fallback for browsers that block synthetic events
      document.designMode = "on";
      document.execCommand("find");
      document.designMode = "off";
    }
  };

  return (
    <button
      onClick={handleFindClick}
      className="px-4 py-2 bg-blue-500 w-52 text-white rounded hover:bg-blue-600"
      title="Search (Ctrl+F)"
    >
      Find
    </button>
  );
}
