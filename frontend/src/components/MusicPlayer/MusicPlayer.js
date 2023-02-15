import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import data from '~/data';
import { MusicIcon } from '../Icons';

function MusicPlayer() {
    var currentIndex = localStorage.getItem('currentIndexSong')
        ? JSON.parse(localStorage.getItem('currentIndexSong'))
        : 0;
    var isPlaying = false;
    var isRandom = localStorage.getItem('isRandomSong') ? JSON.parse(localStorage.getItem('isRandomSong')) : false;
    var isRepeat = localStorage.getItem('isRepeatSong') ? JSON.parse(localStorage.getItem('isRepeatSong')) : false;
    const [showSongBtn, setShowSongBtn] = useState(false);
    var cdThumbAnimate1 = useRef();
    // const pathURL = useLocation();

    useEffect(() => {
        if (document.querySelector('.elementToFadeInAndOut')) {
            document.querySelector('header>h2').textContent = data.songs[currentIndex].name;
            document.querySelector('.cd-thumb').style.backgroundImage = `url(${data.songs[currentIndex].img})`;
            document.querySelector('#audio').src = data.songs[currentIndex].path;

            const cdThumbAnimate = document.querySelector('.cd-thumb').animate([{ transform: 'rotate(360deg)' }], {
                duration: 100000, // 10 seconds
                iterations: Infinity,
            });
            cdThumbAnimate1.current = cdThumbAnimate;
            cdThumbAnimate.pause();
            // if (pathURL.pathname !== '/search/name/') {
            //     document.querySelector('.elementToFadeInAndOut').style.display = 'none';
            // }

            if (isRepeat) document.querySelector('.btn-repeat').classList.toggle('active', isRepeat);
            if (isRandom) document.querySelector('.btn-random').classList.toggle('active', isRandom);
        }
    }, []);

    // =============Handle Song
    const handleClickSongMenu = () => {
        // document.querySelector('.elementToFadeInAndOut').style.right = '280px';
        var opacity = parseInt(
            window.getComputedStyle(document.querySelector('.elementToFadeInAndOut')).getPropertyValue('opacity'),
        );
        if (opacity === 0) {
            document.querySelector('.elementToFadeInAndOut').classList.remove('animation-out');
            document.querySelector('.elementToFadeInAndOut').classList.add('animation-in');
        } else {
            document.querySelector('.elementToFadeInAndOut').classList.remove('animation-in');
            document.querySelector('.elementToFadeInAndOut').classList.add('animation-out');
        }
        // document.querySelector('.elementToFadeInAndOut').style.opacity = 1;
    };

    const handlePlayPauseBtn = () => {
        // console.log(isPlaying);
        if (isPlaying) {
            isPlaying = false;
            document.querySelector('.player').classList.remove('playing');
            cdThumbAnimate1.current.pause();
            document.querySelector('#audio').pause();
        } else {
            isPlaying = true;
            localStorage.setItem('currentIndexSong', JSON.stringify(currentIndex));
            document.querySelector('.player').classList.add('playing');
            cdThumbAnimate1.current.play();
            document.querySelector('.time-remain').style.display = 'block';
            document.querySelector('#audio').play();
            // setIsPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        if (document.querySelector('#audio').duration) {
            const progressPercent = Math.floor(
                (document.querySelector('#audio').currentTime / document.querySelector('#audio').duration) * 100,
            );
            document.querySelector('#progress').value = progressPercent;

            const timeRemain = document.querySelector('#audio').duration - document.querySelector('#audio').currentTime;
            let timeRemainAsMinute;
            if (Math.floor(timeRemain % 60) < 10) {
                timeRemainAsMinute = (timeRemain - (timeRemain % 60)) / 60 + ':0' + Math.floor(timeRemain % 60);
                document.querySelector('.time-remain').textContent = timeRemainAsMinute;
            } else {
                timeRemainAsMinute = (timeRemain - (timeRemain % 60)) / 60 + ':' + Math.floor(timeRemain % 60);
                document.querySelector('.time-remain').textContent = timeRemainAsMinute;
            }
        }
    };

    const handleSkipSong = (e) => {
        const seekTime = (e.target.value / 100) * document.querySelector('#audio').duration; // this.value <=> progress.value <=> e.target.value
        document.querySelector('#audio').currentTime = seekTime;
    };

    const handleVolume = (e) => {
        document.querySelector('#audio').volume = e.target.value / document.querySelector('#audio-volume').max;
        // console.log(audio.volume);
        document.querySelector('.current-volume').textContent = e.target.value + '%';
    };

    const handleRandomSong = (e) => {
        isRandom = !isRandom;
        // _this.setConfig('isRandom', _this.isRandom);
        localStorage.setItem('isRandomSong', JSON.stringify(isRandom));
        document.querySelector('.btn-random').classList.toggle('active', isRandom);
    };

    const handleRepeatSong = (e) => {
        isRepeat = !isRepeat;
        // _this.setConfig('isRepeat', _this.isRepeat);
        localStorage.setItem('isRepeatSong', JSON.stringify(isRepeat));
        document.querySelector('.btn-repeat').classList.toggle('active', isRepeat);
    };

    const loadCurrentSong = function (songIndex) {
        document.querySelector('header>h2').textContent = data.songs[songIndex].name;
        document.querySelector('.cd-thumb').style.backgroundImage = `url(${data.songs[songIndex].img})`;
        document.querySelector('#audio').src = data.songs[songIndex].path;
    };
    const playRandomSong = function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * data.songs.length);
        } while (newIndex === currentIndex);
        currentIndex = newIndex;
        localStorage.setItem('currentIndexSong', JSON.stringify(currentIndex));
        loadCurrentSong(currentIndex);
    };

    const nextSong = function () {
        currentIndex++;
        if (currentIndex >= data.songs.length) {
            currentIndex = 0;
        }
        localStorage.setItem('currentIndexSong', JSON.stringify(currentIndex));
        loadCurrentSong(currentIndex);
    };
    const handleNextSong = (e) => {
        if (isRandom) {
            playRandomSong();
        } else {
            nextSong();
        }
        isPlaying = true;
        document.querySelector('.player').classList.add('playing');
        cdThumbAnimate1.current.play();
        document.querySelector('.time-remain').style.display = 'block';
        document.querySelector('#audio').play();
    };

    const prevSong = function () {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = data.songs.length - 1;
        }
        localStorage.setItem('currentIndexSong', JSON.stringify(currentIndex));
        loadCurrentSong(currentIndex);
    };

    const handlePrevSong = (e) => {
        if (isRandom) {
            playRandomSong();
        } else {
            prevSong();
        }
        isPlaying = true;
        document.querySelector('.player').classList.add('playing');
        cdThumbAnimate1.current.play();
        document.querySelector('.time-remain').style.display = 'block';
        document.querySelector('#audio').play();
    };

    const handleEndSong = (e) => {
        if (isRepeat) {
            document.querySelector('#audio').play();
        } else document.querySelector('.btn-next').click();
    };

    return (
        <>
            {showSongBtn && (
                <div className={'small-song-btn'} onClick={handleClickSongMenu}>
                    <span className={'small-song-btn-icon'}>
                        {/* <RightCircleOutlined /> */}
                        <MusicIcon />
                    </span>
                </div>
            )}
            <div
                className={'elementToFadeInAndOut'}
                onAnimationEnd={() => {
                    setShowSongBtn(true);
                }}
            >
                <div className={'player'}>
                    <div className={'dashboard'}>
                        <header>
                            <h4>Now playing:</h4>
                            <h2>String 57th & 9th</h2>
                        </header>

                        <div className="cd">
                            <div
                                className="cd-thumb"
                                style={{
                                    backgroundImage: `url('https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg')`,
                                }}
                            ></div>
                        </div>

                        <div className="control">
                            <div className="btn btn-repeat" onClick={handleRepeatSong}>
                                <i className="fas fa-redo"></i>
                            </div>
                            <div className="btn btn-prev" onClick={handlePrevSong}>
                                <i className="fas fa-step-backward"></i>
                            </div>
                            <div
                                className="btn btn-toggle-play"
                                onClick={handlePlayPauseBtn}
                                // onPlay={handleOnPlaySong}
                            >
                                <i className="fas fa-pause icon-pause"></i>
                                <i className="fas fa-play icon-play"></i>
                            </div>
                            <div className="btn btn-next" onClick={handleNextSong}>
                                <i className="fas fa-step-forward"></i>
                            </div>
                            <div className="btn btn-random" onClick={handleRandomSong}>
                                <i className="fas fa-random"></i>
                            </div>
                        </div>

                        <div className="progress-wraper">
                            <span className="time-remain"></span>
                            <input
                                id="progress"
                                className="progress"
                                type="range"
                                value="0"
                                step="1"
                                min="0"
                                max="100"
                                onInput={handleSkipSong}
                            />
                        </div>

                        <div className="audio-control">
                            <span className="volume-title">volume:</span>

                            <input
                                id="audio-volume"
                                className="audio-volume"
                                min="0"
                                max="100"
                                defaultValue="50"
                                type="range"
                                onInput={handleVolume}
                            />

                            <span className="current-volume">50%</span>
                        </div>

                        <audio id="audio" src="" onTimeUpdate={handleTimeUpdate} onEnded={handleEndSong}></audio>
                    </div>

                    <div className="playlist"></div>
                </div>
            </div>
        </>
    );
}
export default MusicPlayer;
