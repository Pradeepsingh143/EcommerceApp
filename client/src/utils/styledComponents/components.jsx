import React from "react";
import styled from "styled-components";

export const Button = styled.button(
  ({
    color,
    opacity,
    bgColor,
    border,
    borderRadius,
    hoverColor,
    hoverBgColor,
    hoverBorder,
    size,
    width,
    height,
    fontFamily,
  }) => ({
    color: (color || '#fff'),
    opacity: (opacity || '1'),
    backgroundColor: (bgColor || ''),
    border: (border || ''),
    borderRadius: (borderRadius || '4px'),
    fontSize: (size || ''),
    width: (width || ''),
    height: (height || ''),
    fontFamily: (fontFamily || ''),
    "&:hover": {
      color: hoverColor,
      border: hoverBorder,
      backgroundColor: hoverBgColor,
    },
  })
);

export const Heading = styled.h1(
  ({
    fontWeight,
    fontFamily,
    fontSize,
    fontStyle,
    letterSpacing,
    lineHeight,
    lineBreak,
    color,
    opacity,
    bgColor,
    display,
    textDecoration,
  }) => ({
    fontSize: fontSize || "",
    fontFamily: fontFamily || "",
    fontWeight: fontWeight || "700",
    fontStyle: fontStyle || "",
    letterSpacing: letterSpacing || "",
    lineHeight: lineHeight || "",
    lineBreak: lineBreak || "",
    color: color || "",
    opacity: (opacity || ""),
    backgroundColor: bgColor || "",
    display: display || "",
    textDecoration: textDecoration || "",
  })
);

export const SubHeading = styled.h2(
  ({
    fontWeight,
    fontFamily,
    fontSize,
    fontStyle,
    letterSpacing,
    lineHeight,
    lineBreak,
    color,
    opacity,
    bgColor,
    display,
    textDecoration,
  }) => ({
    fontSize: fontSize || "",
    fontFamily: fontFamily || "",
    fontWeight: fontWeight || 500,
    fontStyle: fontStyle || "",
    letterSpacing: letterSpacing || "",
    lineHeight: lineHeight || "",
    lineBreak: lineBreak || "",
    color: color || "",
    opacity: (opacity || '1'),
    backgroundColor: bgColor || "",
    display: display || "",
    textDecoration: textDecoration || "",
  })
);

export const Paragraph = styled.p(
  ({
    fontWeight,
    fontFamily,
    fontSize,
    fontStyle,
    letterSpacing,
    lineHeight,
    lineBreak,
    color,
    opacity,
    bgColor,
    display,
    textDecoration,
  }) => ({
    fontSize: fontSize || "",
    fontFamily: fontFamily || "",
    fontWeight: fontWeight || 400,
    fontStyle: fontStyle || "normal",
    letterSpacing: letterSpacing || "",
    lineHeight: lineHeight || "",
    lineBreak: lineBreak || "auto",
    color: color || "",
    opacity: (opacity || '1'),
    backgroundColor: bgColor || "",
    display: display || "",
    textDecoration: textDecoration || "",
  })
);
