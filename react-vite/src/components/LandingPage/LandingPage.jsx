import "./LandingPage.css";
import { useEffect, useState, useRef } from "react";
import { FaPhone } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const levelMazes = [
  // maze level 1 - spells "HIRE ME"
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
      // maze level 2

        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],


  ],

[
// Intricate Maze Level - "The Labyrinth of Shadows"
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
],

[
// Master Level - "The Architect's Nightmare"
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
],

[
// Spiral Maze - "The Golden Ratio"
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
],

[
// Temple Level"
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
],

[
// Final Level - "THANKS FOR PLAYING"
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
],
    // Add more levels as needed


];
const awesomeFacts = [
" * Future projects include AI tools, trade bots, and local LLMs!",
" * I can MIG TIG and STICK weld Aluminum, Steel and Stainless Steel!",
" * I create music in my home studio with Pro-Tools and Studio One!",
" * I'm a proud father of 5 amazing kids who inspire everything I do!",
" * I have been married for 10 years to my amazing wife!",
" * I've traveled across America and dream of retiring in the Caribbean!",
" * I have 888+ hours of intensive coding bootcamp experience!",
" * I do 2D/3D modeling, animations, and video editing!",
" * I'm certified in Digital Marketing & E-commerce by Google!",
" * I love fantasy RPGs, worldbuilding, and creating epic adventures!",
" * I enjoy hiking, camping, and exploring the great outdoors!",
" * I'm building 'The Dark Musician' - an epic fantasy 2D platformer game with Unity Engine!",
" * I love reading fantasy novels and playing video games!",
" * I play guitar, drums, piano and many more instruments!",
" * I love playing and watching sports, especially soccer!",
" * I enjoy worldbuilding and creating immersive fantasy RPGs!",
" * I love making awesome videos to share my adventures!",
" * I love traveling and exploring new cultures and places!",
" * I cherish family time with board games, movies, and lots of chaos!",
" * I am passionate about learning new technologies and improving my skills!",
" * I am 35 years young.",
" * I love creating and sharing my knowledge with others!",
];
function LandingPage() {
  const [showFact] = useState(false);
  const [currentFact] = useState("");
  const [collectedFacts, setCollectedFacts] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0)
  // const [gameLevel, setGameLevel] = useState(0);
  const factIndexRef = useRef(0);

  useEffect(() => {
    const mazeContainer = document.getElementById('maze');
    if (!mazeContainer) return;

    // Get dimensions dynamically based on current level
    let maze = levelMazes[currentLevel];


    let player, enemies = [];


    // Define renderMaze FIRST
    function renderMaze(maze, container) {
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (maze[i][j] === 1) {
                    cell.classList.add('wall');
                }
                cell.style.top = `${i * 20}px`;
                cell.style.left = `${j * 20}px`;
                container.appendChild(cell);
            }
        }
    }

    // Then define loadLevel
    function loadLevel(level) {
        mazeContainer.innerHTML = '';
        maze = levelMazes[level];
        // Update dimensions when level changes
        renderMaze(maze, mazeContainer);
    }

    function createEntity(className, row, col) {
        const entity = document.createElement('div');
        entity.className = `cell ${className}`;
        entity.style.top = `${row * 20}px`;
        entity.style.left = `${col * 20}px`;
        mazeContainer.appendChild(entity);
        return entity;
    }

    function createEnemies(level) {
        const enemies = [];
        let greenEnemies, redEnemies;

        // Get current maze dimensions
        const currentMaze = levelMazes[level];
        const currentRows = currentMaze.length;
        const currentCols = currentMaze[0].length;

        switch(level) {
            case 0: greenEnemies = 3; redEnemies = 2; break;
            case 1: greenEnemies = 5; redEnemies = 4; break;
            case 2: greenEnemies = 9; redEnemies = 10; break;
            default: greenEnemies = 3; redEnemies = 2;
        }

        // Create green enemies
        for (let i = 0; i < greenEnemies; i++) {
            let row, col;
            let attempts = 0;
            do {
                row = Math.floor(Math.random() * currentRows);
                col = Math.floor(Math.random() * currentCols);
                attempts++;
            } while (
                attempts < 100 && (
                    row >= currentRows ||
                    col >= currentCols ||
                    currentMaze[row][col] === 1 ||
                    (row === 1 && col === 1)
                )
            );

            if (attempts < 100) {
                const enemy = createEntity('enemy green-enemy', row, col);
                enemies.push({ element: enemy, type: 'green' });
            }
        }

        // Create red enemies
        for (let i = 0; i < redEnemies; i++) {
            let row, col;
            let attempts = 0;
            do {
                row = Math.floor(Math.random() * currentRows);
                col = Math.floor(Math.random() * currentCols);
                attempts++;
            } while (
                attempts < 100 && (
                    row >= currentRows ||
                    col >= currentCols ||
                    currentMaze[row][col] === 1 ||
                    (row === 1 && col === 1)
                )
            );

            if (attempts < 100) {
                const enemy = createEntity('enemy red-enemy', row, col);
                enemies.push({ element: enemy, type: 'red' });
            }
        }

        return enemies;
    }

    function isWall(top, left) {
        const row = top / 20;
        const col = left / 20;

        // Get current maze dimensions
        const currentRows = maze.length;
        const currentCols = maze[0].length;

        // Check bounds first
        if (row < 0 || row >= currentRows || col < 0 || col >= currentCols) {
            return true;
        }

        // Check if it's a wall
        return maze[row][col] === 1;
    }

    // function collectFact() {
    //     const randomFact = awesomeFacts[factIndex % awesomeFacts.length];
    //     setCollectedFacts(prev => {
    //         if (!prev.includes(randomFact)) {
    //             return [...prev, randomFact];
    //         }
    //         return prev;
    //     });
    //     factIndex++;
    // }
    const collectFact = () => {
      console.log("awesomeFacts.length:", awesomeFacts.length); // Should show 22

      const randomFact = awesomeFacts[factIndexRef.current % awesomeFacts.length];
      setCollectedFacts(prev => {
        if (!prev.includes(randomFact)) {
          return [...prev, randomFact];
        }
        return prev;
      });
      factIndexRef.current += 1;
    };
    function movePlayer(top, left) {
        if (isWall(top, left)) return;

        player.style.top = `${top}px`;
        player.style.left = `${left}px`;

        // Check collision with enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemyObj = enemies[i];
            const enemy = enemyObj.element;

            if (top === parseInt(enemy.style.top) && left === parseInt(enemy.style.left)) {
                if (enemyObj.type === 'green') {
                    collectFact();
                    mazeContainer.removeChild(enemy);
                    enemies.splice(i, 1);

                    const remainingGreen = enemies.filter(e => e.type === 'green').length;
                    if (remainingGreen === 0) {
                        setTimeout(() => {
                            alert('All facts collected! Moving to next level!');
                            if (currentLevel + 1 < levelMazes.length) {
                                setCurrentLevel(prev => prev + 1);
                            } else {
                                alert('You have completed all levels!');
                                handleResetGame();
                            }
                        }, 500);
                    }
                } else if (enemyObj.type === 'red') {
                    alert('You were caught by a red enemy! Game over!');
                    handleResetGame();
                }
                break;
            }
        }
    }


    function handleResetGame() {
        setCurrentLevel(0);
        // setCollectedFacts([]);

    }

    function handleSwitchLevel() {
        setCurrentLevel(prev => (prev + 1) % levelMazes.length);
        setCollectedFacts([]);
    }

    function handleKeydown(event) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
        }

        let top = parseInt(player.style.top);
        let left = parseInt(player.style.left);

        switch (event.key) {
            case 'ArrowUp': movePlayer(top - 20, left); break;
            case 'ArrowDown': movePlayer(top + 20, left); break;
            case 'ArrowLeft': movePlayer(top, left - 20); break;
            case 'ArrowRight': movePlayer(top, left + 20); break;
        }
    }

    // Initialize game
    loadLevel(currentLevel);
    player = createEntity('player', 1, 1);
    enemies = createEnemies(currentLevel);

    // Add event listeners
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('resetGame', handleResetGame);
    document.addEventListener('switchLevel', handleSwitchLevel);

    // Enemy movement interval
    const enemyInterval = setInterval(() => {
        enemies.forEach(enemyObj => {
            const enemy = enemyObj.element;
            if (enemy.parentNode) {
                let top = parseInt(enemy.style.top);
                let left = parseInt(enemy.style.left);
                let direction = Math.floor(Math.random() * 4);

                switch (direction) {
                    case 0: if (!isWall(top - 20, left)) enemy.style.top = `${top - 20}px`; break;
                    case 1: if (!isWall(top + 20, left)) enemy.style.top = `${top + 20}px`; break;
                    case 2: if (!isWall(top, left - 20)) enemy.style.left = `${left - 20}px`; break;
                    case 3: if (!isWall(top, left + 20)) enemy.style.left = `${left + 20}px`; break;
                }
            }
        });
    }, 800);

    // Cleanup function
    return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('resetGame', handleResetGame);
        document.removeEventListener('switchLevel', handleSwitchLevel);
        clearInterval(enemyInterval);
    };

}, [currentLevel]);




  return (
    <div
    className="landing"
    >
          {showFact && (
            <div className="fact-popup">
                <div className="fact-content">
                    {currentFact}
                </div>
            </div>
        )}
        <h1
        className="title"
        >Dustin Bovee</h1>

        <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/b_rgb:FFFFFF/f_png/v1747963856/472684932_8842676349115109_2028848718984112102_n_xm2fqm.jpg" className="profile-picture" />

        <div
        className="bios"
        >
            <div
            className="about"
            >

<h2>About Me:</h2>
<p>
  I&apos;m a proud husband and father of five incredible kids who are my biggest inspiration and motivation. Every line of code I write, every project I tackle, and every goal I chase is fueled by my desire to build a better future for them. My family keeps me grounded while simultaneously pushing me to reach higher — they&apos;re my why behind everything I do.<br/><br/>

  My world is a beautiful blend of logic and creativity. By day, I&apos;m deep in full-stack development, architecting solutions and solving complex problems with clean, efficient code. By night, you&apos;ll find me in my home studio, layering tracks and creating music that tells stories. I play guitar, piano, drums, and pretty much any instrument I can get my hands on. There&apos;s something incredibly satisfying about both debugging code and perfecting a melody — they both require patience, creativity, and that aha! moment when everything clicks.<br/><br/>

  I&apos;m genuinely passionate about the intersection of technology, design, and human experience. With over 888 hours of intensive bootcamp training and Google certifications in digital marketing and e-commerce, I&apos;ve developed a unique perspective on how to build not just functional applications, but experiences that people actually want to use. I love taking complex, intimidating concepts and transforming them into intuitive, user-friendly solutions that make people&apos;s lives easier.<br/><br/>

  What really sets me apart is my hunger for continuous learning and growth. I&apos;m that person who gets excited about new frameworks, stays up late reading documentation, and genuinely enjoys the challenge of tackling problems I&apos;ve never seen before. I thrive in collaborative environments where ideas flow freely and everyone&apos;s pushing each other to be better. I believe the best solutions come from diverse perspectives and healthy debate.<br/><br/>

  When I&apos;m not coding or making music, I&apos;m probably getting way too competitive about fantasy sports (don&apos;t even get me started on my draft strategy), diving into epic fantasy novels, or planning our next family adventure. I&apos;m a traveler at heart — I&apos;ve explored cities from coast to coast across America and ventured into several countries, always seeking new cultures, cuisines, and perspectives that broaden my worldview.<br/><br/>

  Speaking of travel, I have some serious wanderlust. My ultimate dream is to spend extended time in Iceland, experiencing those otherworldly landscapes, the Northern Lights, and that unique Nordic culture. And for retirement? I&apos;m picturing myself in the southern Caribbean, where crystal-clear waters meet endless sunsets, and the pace of life matches the rhythm of the waves. I could literally talk for hours about cruise itineraries, hidden travel gems, and that perfect balance between adventure and relaxation.<br/><br/>

  But here&apos;s what really drives me: the thrill of creation. Whether I&apos;m building a seamless user interface, composing a track that gives people chills, crafting the perfect fantasy lineup, or solving a coding challenge that&apos;s been stumping me for days — I live for those moments when something new comes to life. I bring that same creative energy, problem-solving mindset, and collaborative spirit to every team I join and every project I touch.<br/><br/>

  At my core, I&apos;m someone who believes technology should enhance human connection, not replace it. I&apos;m looking for opportunities to work with people who share that vision — teams that value innovation, creativity, and the kind of authentic collaboration that leads to breakthrough solutions. Let&apos;s build something amazing together.
</p>





        <div
        className="picture-container">

         <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/462504050_8324973944218688_6095070514255415304_n_drhvmy.jpg" className="picture" alt="dustin-bovee-with-under-the-vine"/>
         <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1748132681/485807983_9289284137787659_7415467271367767227_n_vytilr.jpg" className="picture" alt="dustin-bovee-with-alcohol"/>
         <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/485761821_9289269257789147_3271802936818663508_n_v9keh4.jpg" className="picture" alt="dustin-bovee-with-wife-and-older-kids"/>
         <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1748132663/486354092_9289268864455853_8457108257314763719_n_nrrd2m.jpg" className="picture" alt="dustin-bovee-with-wife"/>
        </div>










        <h2>Looking For:</h2>
        <p> I am looking for a full-time position as a <br/>software engineer.
         I&apos;m on the lookout for a company that values creativity<br/> and innovation.
        I am actively seeking out a company that is willing to invest <br/>in my growth and development.
        <br/>I am looking for collaborators and new opportunities.<br/> </p>




        <h2>Education: </h2>
        <p
        className="education"
        >App Academy — Full Stack Software Engineering Bootcamp<br/>
        Graduated 2025 | 888+ hours | Acceptance rate less than 3%</p>
        <p
        className="education"
        >Grow With Google — Digital Marketing & e-commerce
          <br/>
          Graduated 2023 | 7 courses | 7 Google Certifications
        </p>
        <p
        className="education"
        >Glen Oaks Community College — Associates of General Studies
          <br/>
          Graduated 2023
        </p>
            </div>


            <div
            className="about"
            >

                {/* Facts Collection Display */}
                <div className="facts-collection">
                <h3>Collected Facts About Me ({collectedFacts.length}/{awesomeFacts.length}):</h3>
                    <div className="facts-list">
                        {collectedFacts.length === 0 ? (
                            <p className="no-facts">Start playing to collect awesome facts!</p>
                        ) : (

                            collectedFacts.map((fact, index) => (
                                <div key={index} className="collected-fact">
                                    {fact}
                                </div>
                            ))

                        )}
                    </div>
                </div>

                <div className="game-container">
        <div id="maze"></div>
    {/* Mobile Controls - NOW OUTSIDE */}
    <div className="mobile-controls">
        <div className="control-row">
            <button className="control-btn" onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                document.dispatchEvent(event);
            }}>↑</button>
        </div>
        <div className="control-row">
            <button className="control-btn" onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                document.dispatchEvent(event);
            }}>←</button>
            <button className="control-btn" onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                document.dispatchEvent(event);
            }}>↓</button>
            <button className="control-btn" onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                document.dispatchEvent(event);
            }}>→</button>
        </div>
    </div>


                {/* Reset Game Button and Level Selector */}
            <div className="reset-container">
            <button className="reset-btn" onClick={() => {
                        const event = new CustomEvent('resetGame');
                        document.dispatchEvent(event);
                    }}>
                        🔄 Reset Game
                    </button>

                    <button className="level-btn" onClick={() => {
                        const event = new CustomEvent('switchLevel');
                        document.dispatchEvent(event);
                    }}>
                        Next Level (Level {currentLevel + 1})
                    </button>
            </div>



        <p className="game-instructions">
            🎮 Use arrow keys or buttons below to move! 🎮<br/>
            🟢 Green = Collect Facts | 🔴 Red = Avoid!
        </p>
    </div>




{/*
                <h2>Hobbies and Interests:</h2>
                <p>🥾 Hiking<br/>
                 ⛺ Camping<br/>
                📖 Reading<br/>
                🎮 Playing Video Games.<br/>
               🎸 Playing Music <br/>
               🎨 Animations<br/>
                ⚽ Playing & Watching Sports<br/>
               🧙 Fantasy RPGs & Worldbuilding<br/>
               🎥 Making Awesome Videos<br/>
               🛩️ Traveling<br/>
                👨‍👩‍👧‍👦 Family Time (board games, movies, and chaos)</p> */}


        <h2
        >Future Projects:</h2>
        <ul
        className="future-projects"
        >
            <li>Local LLM</li>
            <li>AI Image Generator </li>
            <li>Personal School App</li>
            <li>Jam Session AI</li>
            <li>AI Trade Bot</li>
        </ul>




<h2>Personal Projects:</h2>
        <h3>Dustin Bovee Music:</h3>
        <p>Pro-Tools, Studio One, Ozone 9, Avid,<br/> Guitar, Piano, Drums, Bass, Vocals, Synth, <br/> Woodwinds, Brass, Orchestra, Recording, <br/> Mixing and Mastering,
        Sound and Song Engineering </p>
        <div
        className="video-container"
        >

        <iframe
            className="video"
            width="360" height="215" src="https://www.youtube.com/embed/xnXgBuqI-1g?si=6wtGMT3SMcQURKOw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


          <iframe
          className="video"
          width="360" height="215" src="https://www.youtube.com/embed/aA-tknLpm4U?si=3L_bil4wM-Z-nsp-" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

        <h3>The Dark Musician: </h3>
        <p>Unity, Harmony22, ToonBoon, Adobe Suite, Blender,<br/> Game Design Documentation, UI/UX,</p>
          <div
          className="image-container"
          >

          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747867182/melody_mih8nb.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747868619/banker_zzynci.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747868469/melancholy_h3rl4y.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747868590/muted-singer_jqzxjh.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/e_background_removal/f_png/v1747870423/8yfbbQmBCOipBlepN6eO--1--djg4q_uhvqch.jpg" className="image" />

          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747870624/drums_j82q1b.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747870692/heartbeat_qbmrsb.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747870585/headphones_rkdtof.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747870693/microphone_mgsxsz.png" className="image" />

          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747870696/piano_xllx7u.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747870689/guitar_isdahh.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747870688/flute_w48bvw.png" className="image" />

          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/e_background_removal/f_png/v1747869226/additional_1_teiv38.png" className="image" />

          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/e_background_removal/f_png/v1747869230/additional_4_keftze.png" className="image" />

          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/e_background_removal/f_png/v1747869233/additional_6_fzxaqd.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/e_background_removal/f_png/v1747869236/additional_8_nstngm.png" className="image" />
          <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747869186/deathbat_nft-removebg-preview_uug359.png" className="image" />

          </div>






            </div>
            </div>




            <h2> Skills / Known Technologies: </h2>


        <div
        className="skill-tree"
        >
            <ul
             className="skill-tree-list"
            >


            <li
            className="list-a-skill"
            >Microsoft Suite -- Excel,Word, etc...</li>
            <li
            className="list-a-skill"
            >Adobe Suite -- Ae, Ps, etc...</li>
            <li
            className="list-a-skill"
            >Frameworks and Libraries</li>
            <li
            className="list-a-skill"
            >Data Structures & Algorithms</li>
            <li
            className="list-a-skill"
            >Binary Search Trees</li>
            <li
            className="list-a-skill"
            >
            Full-Stack Development
            </li>
            <li
            className="list-a-skill"
            >Hashes / Conversions</li>
            <li
            className="list-a-skill"
            >WebApp Security</li>
            <li
            className="list-a-skill"
            >Software Development Life Cycle</li>
            <li
            className="list-a-skill"
            >Test Driven Development</li>
            <li
            className="list-a-skill"
            >Object Oriented Programming</li>
            <li
            className="list-a-skill"
            >Postgresql</li>
            <li
            className="list-a-skill"
            >Postman</li>
            <li
            className="list-a-skill"
            >Developer&apos;s Tools</li>
            <li
            className="list-a-skill"
            >Google Developer&apos;s</li>
            <li
            className="list-a-skill"
            >Visual Studio Code</li>
            <li
            className="list-a-skill"
            >Linux</li>
            <li
            className="list-a-skill"
            >React</li>
            <li
            className="list-a-skill"
            >Express</li>
            <li
            className="list-a-skill"
            >Flask</li>
            <li
            className="list-a-skill"
            >Redux</li>
            <li
            className="list-a-skill"
            >Thunk</li>
            <li
            className="list-a-skill"
            >Render</li>
            <li
            className="list-a-skill"
            >Github</li>
            <li
            className="list-a-skill"
            >Virtualization</li>
            <li
            className="list-a-skill"
            >Databases</li>
            <li
            className="list-a-skill"
            >Servers</li>
            <li
            className="list-a-skill"
            >Python</li>
            <li
            className="list-a-skill"
            >Javascript</li>
            <li
            className="list-a-skill"
            >SQL</li>
            <li
            className="list-a-skill"
            >CSS</li>
            <li
            className="list-a-skill"
            >HTML</li>
            <li
            className="list-a-skill"
            >Node.js</li>
            <li
            className="list-a-skill"
            >API&apos;s</li>
            <li
            className="list-a-skill"
            >Polygon</li>
            <li
            className="list-a-skill"
            >React Charts</li>
            <li
            className="list-a-skill"
            >Cloudinary</li>
            <li
            className="list-a-skill"
            >Wireframes</li>
            <li
            className="list-a-skill"
            >Gsap</li>
            <li
            className="list-a-skill"
            >Database Schemas</li>
            <li
            className="list-a-skill"
            >Containerization </li>
            <li
            className="list-a-skill"
            >Docker/ Kubernetes</li>
            <li
            className="list-a-skill"
            >AWS</li>
            <li
            className="list-a-skill"
            >
            Git Version Control
            </li>
            <li
            className="list-a-skill"
            >
            Pytorch
            </li>
            <li
            className="list-a-skill"
            >
            Administrative Documentation
            </li>
            <li
            className="list-a-skill"
            >
            jQuery
            </li>
            <li
            className="list-a-skill"
            >
            Kanban
            </li>
            <li
            className="list-a-skill"
            >
            Brand Awareness
            </li>
            <li
            className="list-a-skill"
            >
           Copywriting
            </li>
            <li
            className="list-a-skill"
            >
            Digital Marketing & e-commerce
            </li>
            <li
            className="list-a-skill"
            >
            Creating Fascinations
            </li>
            <li
            className="list-a-skill"
            >
            SEO / SEM
            </li>
            <li
            className="list-a-skill"
            >
            Data & Marketing Analytics
            </li>
            <li
            className="list-a-skill"
            >
            Videography
            </li>
            <li
            className="list-a-skill"
            >
            A/b Testing
            </li>
            <li
            className="list-a-skill"
            >
            Targeted Audiences
            </li>
            <li
            className="list-a-skill"
            >
            Lead Generation Pipelines
            </li>
            <li
            className="list-a-skill"
            >
            Content Creation
            </li>
            <li
            className="list-a-skill"
            >
            Video Editing
            </li>
            <li
            className="list-a-skill"
            >
            Unreal Engine
            </li>
            <li
            className="list-a-skill"
            >
            Blender
            </li>
            <li
            className="list-a-skill"
            >
            AutoDesk / AutoCad
            </li>
            <li
            className="list-a-skill"
            >
            Solid Works
            </li>
            <li
            className="list-a-skill"
            >
            2D / 3D Modeling
            </li>
            <li
            className="list-a-skill"
            >
            Systems Design
            </li>
            <li
            className="list-a-skill"
            >
            Interpersonal Skills
            </li>
            <li
            className="list-a-skill"
            >
            Project Management
            </li>
            <li
            className="list-a-skill"
            >
            Building Automation Tools
            </li>
            <li
            className="list-a-skill"
            >
            Web Performance Optimization
            </li>
            <li
            className="list-a-skill"
            >
            Responsive Web Design
            </li>
            <li
            className="list-a-skill"
            >
            Communication
            </li>
            <li
            className="list-a-skill"
            >
            QuickBooks
            </li>
            <li
            className="list-a-skill"
            >
            TeamPlayer
            </li>
            <li
            className="list-a-skill"
            >
            Time Management
            </li>
            <li
            className="list-a-skill"
            >
            Adaptibilty
            </li>
            <li
            className="list-a-skill"
            >
            UX / UI Design
            </li>
            <li
            className="list-a-skill"
            >
            Cloud Computing
            </li>
            <li
            className="list-a-skill"
            >
            Encryption / Cryptography
            </li>
            <li
            className="list-a-skill"
            >
            RESTful API Development
            </li>
            <li
            className="list-a-skill"
            >
            Agile / Scrum
            </li>
            <li
            className="list-a-skill"
            >
            MVP / Rapid Prototyping
            </li>
            <li
            className="list-a-skill"
            >
            Feature Engineering
            </li>
            <li
            className="list-a-skill"
            >
            TensorFlow
            </li>
            <li
            className="list-a-skill"
            >
            Pandas
            </li>
            <li
            className="list-a-skill"
            >
            Unit and Integration Testing
            </li>
            <li
            className="list-a-skill"
            >
            Cors
            </li>
            <li
            className="list-a-skill"
            >
            Vite Build Tools
            </li>
            <li
            className="list-a-skill"
            >
            Accurate Spec Acquisition
            </li>
            <li
            className="list-a-skill"
            >
            Sound Engineering
            </li>
            <li
            className="list-a-skill"
            >
            Music Production
            </li>
            <li
            className="list-a-skill"
            >
            Debugging
            </li>
            <li
            className="list-a-skill"
            >
            Open Source Contribution
            </li>
            <li
            className="list-a-skill"
            >
            MultiTasking
            </li>
            <li
            className="list-a-skill"
            >
            Crital Thinking
            </li>
            <li
            className="list-a-skill"
            >
            Problem Solving
            </li>

            <li
            className="list-a-skill"
            >
            Attention to Detail
            </li>
            <li
            className="list-a-skill"
            >
              Object-Relational Mapping
            </li>
            <li
            className="list-a-skill"
            >
              Sequelize
            </li>
            <li
            className="list-a-skill">
              SQLAlchemy
            </li>
            <li
            className="list-a-skill">
              Key Performance Indicators
            </li>
            <li
            className="list-a-skill">
              KPI Reporting
            </li>
            <li
            className="list-a-skill">
              Data Visualization
            </li>
            <li
            className="list-a-skill">
              High Volume Data
            </li>
            <li
            className="list-a-skill">
            Web Accessibility

            </li>
            <li
            className="list-a-skill">
            CRUD Operations

            </li>
            <li
            className="list-a-skill">
            WTForms
            </li>
            <li
            className="list-a-skill">
              React Router Documentation
            </li>
            <li
            className="list-a-skill">
            Big-O

            </li>
            <li
            className="list-a-skill">
            Linear Data Structures

            </li>
            <li
            className="list-a-skill">
              Sorting
            </li>
            <li
            className="list-a-skill">
            Trees

            </li>
            <li
            className="list-a-skill">
            Graphs

            </li>
            <li
            className="list-a-skill">
           Callbacks

            </li>
            <li
            className="list-a-skill">
           Scopes and Closures

            </li>
            <li
            className="list-a-skill">
              Recursion
            </li>
            <li
            className="list-a-skill">
            IIFEs

            </li>
            <li
            className="list-a-skill">
            Asynchronous Programming

            </li>
            <li
            className="list-a-skill">
            Microservices

            </li>
            <li
            className="list-a-skill">
            TDD with pytest

            </li>
            <li
            className="list-a-skill">
            Python Environment Management

            </li>
            <li
            className="list-a-skill">
            Polymorphism

            </li>
            <li
            className="list-a-skill">
            Inheritance

            </li>
            <li
            className="list-a-skill">
            Python Decorators

            </li>
            <li
            className="list-a-skill">
            Built in Methods

            </li>
            <li
            className="list-a-skill">
            Advanced List Comprehensions

            </li>
            <li
            className="list-a-skill">
            Tuples

            </li>
            <li
            className="list-a-skill">
            Router Nesting

            </li>
            <li
            className="list-a-skill">
            React Hooks

            </li>
            <li
            className="list-a-skill">
            Reactive Functions

            </li>
            <li
            className="list-a-skill">
            Custom Forms and Validations

            </li>
            <li
            className="list-a-skill">
            Context

            </li>
            <li
            className="list-a-skill"
            >
            Continous Learning
            </li>










            </ul>
        </div>
<br/>
<br/>
        <h2>Links To Projects:</h2>


        <div
        className="link-container"
        >

        <a
          href='https://footballbnb.onrender.com/'
          target="_self"
          className='links'
          >Football bnb
          </a>
        <a
          href='https://tradetoad.onrender.com/'
          target="_self"
          className='links'
          >Trade Toad
          </a>
        <a
          href='https://arcana-academy.onrender.com/'
          target="_self"
          className='links'
          >Arcana Academy
          </a>
        <a
          href='https://joezanos-pizza.onrender.com/'
          target="_self"
          className='links'
          >Joezano&apos;s Pizza
          </a>

        </div>



        <h2>Connect With Me</h2>

<div
className="link-container"
>


<a

href="tel:269-506-5112"
 className='links'
>
  <FaPhone />
</a>

  <a

  href="mailto:dbovee824@gmail.com
         ?subject=Saying%20hello%20from%20GFG"
  className='links'
         >
        <TfiEmail />
    </a>
<a
  href='https://github.com/XSpiritWizardX'
  target="_self"
  className='links'
  >
    <FaGithub />

  </a>
<a
  href='https://www.linkedin.com/in/dustin-bovee/'
  target="_self"
  className='links'
  >
    <FaLinkedin />

  </a>
  <a
  href='https://www.youtube.com/@dustinboveemusic'
  target="_self"
  className='links'
  >
    <FaYoutube />
  </a>
</div>





    </div>
  );
}

export default LandingPage;
