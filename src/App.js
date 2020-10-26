import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import labyrintheIMG from './img/Labyrinthe.jpg'
import Labyrinthe from './labyrinthe.js'
import sleep from 'system-sleep'

function App() {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const labyrinthe = new Labyrinthe();


  /**
 * Méthode permetant la création du "canvas".
 */
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "#000000"
    context.lineWidth = 10
    contextRef.current = context;
  }, [])



  const handleParcour = () => {
    contextRef.current.beginPath()
    var chemin = null
    if (chemin === null) {
      chemin = labyrinthe.Parcourir()
    }
      console.log(chemin)
      draw(0, 0)
      let i = 0;
      do {
        task(chemin, i);
        i++;
      } while (i < chemin.length);
    }
  function task(chemin, i) {
    setTimeout(function () {
      draw(chemin[i].positionX, chemin[i].positionY)
    }
      , 1000)

  }

  /**
   * Cette méthode est appeller lors de la détection d'un visage et permet de faire le carré autour de celui-ci.
   */


  /**
   * Cette méthode permet d'éffacer ce qui est présent sur le "canvas"
   */
  const canvasReset = () => {
    contextRef.current.clearRect(0, 0, (window.innerWidth * 2), (window.innerHeight * 2));
  }


  /**
   * Cette méthode permet de désiner sur le "canvas" de certaine coorder à une autre.
   * @param {La valeur de x de la première coordoner.} x1 
   * @param {La valeur de y de la première coordoner.} y1 
   */
  const draw = (x1, y1) => {
    x1 = x1 * 88 + 44
    y1 = y1 * 88 + 44
    contextRef.current.moveTo(x1, y1)
    contextRef.current.stroke()
    contextRef.current.lineTo(x1, y1)

  }


  return (
    <div className="App" >
      <div class="controle">
        <div>
          <button class="button button1" onClick={handleParcour} >Analyser</button>
        </div>
      </div>
      <div>
        <img class="relative" src={labyrintheIMG} alt="aucune" id="picture" />
        <canvas id="myCanvas" class="relative" ref={canvasRef} />
      </div>
      <div>
        <p>
        </p>
      </div>
    </div>
  );
}

export default App;
