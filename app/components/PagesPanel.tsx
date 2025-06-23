"use client";

// Vendor
import React, { useState } from "react";

// Components
import Button from "@/app/components/Button";
import SettingsMenu from "@/app/components/SettingsMenu";

// Types
import { IconName } from "lucide-react/dynamic";

interface PageButton {
  id: string;
  text: string;
  iconName: IconName;
  isActive: boolean;
}

// Inner Components
function DashedLine() {
  return <div className="border-1 border-dashed border-[#C0C0C0] max-w-[20px] w-full h-[1px]"></div>;
}

export default function PagesPanel() {
  const [buttons, setButtons] = useState<PageButton[]>([
    {
      id: "0",
      text: "Home",
      iconName: "house",
      isActive: true,
    },
    {
      id: "1",
      text: "Profile",
      iconName: "user",
      isActive: false,
    },
    {
      id: "2",
      text: "Settings",
      iconName: "settings",
      isActive: false,
    },
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [settingsPosition, setSettingsPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const getPreviewButtons = () => {
    if (!draggedItem || dragOverIndex === null) return buttons;

    const draggedIndex = buttons.findIndex((button) => button.id === draggedItem);
    if (draggedIndex === -1) return buttons;

    const newButtons = [...buttons];
    const [draggedButton] = newButtons.splice(draggedIndex, 1);
    newButtons.splice(dragOverIndex, 0, draggedButton);

    return newButtons;
  };

  const previewButtons = getPreviewButtons();

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (!draggedItem) return;

    const draggedIndex = buttons.findIndex((button) => button.id === draggedItem);
    if (draggedIndex === -1 || draggedIndex === dropIndex) return;

    const newButtons = [...buttons];
    const [draggedButton] = newButtons.splice(draggedIndex, 1);
    newButtons.splice(dropIndex, 0, draggedButton);

    setButtons(newButtons);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleSetActivePage = (id: string) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) => ({
        ...button,
        isActive: button.id === id,
      })),
    );
  };

  const handleAddNewPage = () => {
    setButtons((prevButtons) => [
      ...prevButtons,
      {
        id: `${prevButtons.length + 1}`,
        text: `Page ${prevButtons.length + 1}`,
        iconName: "circle-dashed",
        isActive: false,
      },
    ]);
  };

  const handleOnEllipsisClick = (e: any, id: string) => {
    setSettingsPosition({ x: e.pageX, y: e.pageY });
    setShowSettings(true);
  };

  return (
    <div className="bg-[#F9FAFB] p-20 box-border flex z-20 relative items-center" onDragLeave={handleDragLeave}>
      <SettingsMenu isShowing={showSettings} position={settingsPosition} handleHide={() => console.log("a")} />

      {!!buttons.length &&
        buttons.map((button, index) => {
          const isDragged = draggedItem === button.id;
          const originalIndex = buttons.findIndex((b) => b.id === button.id);
          const previewIndex = previewButtons.findIndex((b) => b.id === button.id);
          const isMoving = originalIndex !== previewIndex && !isDragged;

          return (
            <React.Fragment key={button.id}>
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, button.id)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`
                  relative cursor-move transition-all duration-300 ease-in-out
                  ${isDragged ? "opacity-30 scale-95 z-10" : ""}
                  ${isMoving ? "transform" : ""}
                `}
                style={{
                  transform: isMoving ? `translateX(${(previewIndex - originalIndex) * 4}px)` : undefined,
                }}
              >
                <Button
                  {...button}
                  onClick={() => handleSetActivePage(button.id)}
                  onEllipsisClick={(e) => handleOnEllipsisClick(e, button.id)}
                />
              </div>

              {(index === 0 || index !== buttons.length - 1) && <DashedLine />}
            </React.Fragment>
          );
        })}
      <DashedLine />
      <Button text="Add page" iconName="plus" isAction onClick={handleAddNewPage} />
    </div>
  );
}
