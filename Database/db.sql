--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2022-12-22 21:33:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16413)
-- Name: player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.player (
    id text NOT NULL,
    name text,
    birthday date,
    type text,
    role text,
    team_id text,
    goal bigint DEFAULT 0
);


ALTER TABLE public.player OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16427)
-- Name: result; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.result (
    id text NOT NULL,
    team1 text,
    team2 text,
    score_team1 bigint,
    score_team2 bigint
);


ALTER TABLE public.result OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16441)
-- Name: role_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_user (
    id bigint NOT NULL,
    name text
);


ALTER TABLE public.role_user OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16420)
-- Name: schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedules (
    id text NOT NULL,
    tournament_id text,
    result_id text,
    date date,
    address text,
    round bigint,
    "time" time without time zone
);


ALTER TABLE public.schedules OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16406)
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    id text NOT NULL,
    name text,
    logo text,
    stadium text
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: tournaments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tournaments (
    id text NOT NULL,
    name text,
    logo text,
    count_team bigint,
    day_start date,
    day_end date
);


ALTER TABLE public.tournaments OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16434)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text,
    password text,
    phone text,
    email text,
    nationality text,
    avatar text,
    role bigint
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3355 (class 0 OID 16413)
-- Dependencies: 216
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('1', 'Rimario Allando Gordon', NULL, 'ngoài nước', 'Tiền đạo', NULL, NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('2', 'Phạm Tuấn Hải', NULL, 'trong nước', 'Tiền đạo', '3', NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('3', 'Geovane Magno', NULL, 'ngoài nước', 'Tiền đạo', NULL, NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('4', 'Jermie Dwayne Lynch', NULL, 'ngoài nước', 'Tiền đạo', '4', NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('5', 'Nguyễn Tiến Linh', NULL, 'trong nước', 'Tiền đạo', NULL, NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('6', 'Paollo Madeira Oliveria', NULL, 'ngoài nước', 'Tiền đạo', '6', NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('7', 'Jose Paulo De Oliveria', NULL, 'ngoài nước', 'Tiền vệ', '5', NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('8', 'Nguyễn Văn Quyết', NULL, 'trong nước', 'Tiền đạo', '3', NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('9', 'Hendrio Arayjo Dasilva', NULL, 'ngoài nước', 'Tiền vệ', '4', NULL);
INSERT INTO public.player (id, name, birthday, type, role, team_id, goal) VALUES ('10', 'Goncalves Silva Lucas Vinicius', NULL, 'ngoài nước', 'Tiền đạo', '3', NULL);


--
-- TOC entry 3357 (class 0 OID 16427)
-- Dependencies: 218
-- Data for Name: result; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.result (id, team1, team2, score_team1, score_team2) VALUES ('1', '1', '8', NULL, NULL);
INSERT INTO public.result (id, team1, team2, score_team1, score_team2) VALUES ('2', '9', '10', NULL, NULL);
INSERT INTO public.result (id, team1, team2, score_team1, score_team2) VALUES ('3', '11', '5', NULL, NULL);
INSERT INTO public.result (id, team1, team2, score_team1, score_team2) VALUES ('4', '14', '4', NULL, NULL);
INSERT INTO public.result (id, team1, team2, score_team1, score_team2) VALUES ('5', '12', '13', NULL, NULL);


--
-- TOC entry 3359 (class 0 OID 16441)
-- Dependencies: 220
-- Data for Name: role_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role_user (id, name) VALUES (1, 'người quản lý giải đấu');
INSERT INTO public.role_user (id, name) VALUES (2, 'người quản lý đội bóng');
INSERT INTO public.role_user (id, name) VALUES (3, 'người dùng');


--
-- TOC entry 3356 (class 0 OID 16420)
-- Dependencies: 217
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.schedules (id, tournament_id, result_id, date, address, round, "time") VALUES ('1', '1', '1', '2022-11-19', 'SVĐ Pleiku', NULL, '16:00:00');
INSERT INTO public.schedules (id, tournament_id, result_id, date, address, round, "time") VALUES ('2', '1', '2', '2022-12-26', 'SVĐ Hàng Đẫy', NULL, '16:00:00');
INSERT INTO public.schedules (id, tournament_id, result_id, date, address, round, "time") VALUES ('3', '1', '3', '2022-12-26', 'SVĐ Lạch Tray', NULL, '19:00:00');
INSERT INTO public.schedules (id, tournament_id, result_id, date, address, round, "time") VALUES ('4', '1', '4', '2022-12-30', 'SVĐ Gò Đậu', NULL, '16:00:00');
INSERT INTO public.schedules (id, tournament_id, result_id, date, address, round, "time") VALUES ('5', '1', '5', '2022-12-31', 'SVĐ Thống Nhất', NULL, '16:00:00');


--
-- TOC entry 3354 (class 0 OID 16406)
-- Dependencies: 215
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.teams (id, name, logo, stadium) VALUES ('1', 'Hoàng Anh Gia Lai', './assets/images/HAGL.png', 'SVĐ Pleiku');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('2', 'Bà Rịa Vũng Tàu', './assets/images/BRVT_logo.png', 'SVĐ Bà Rịa');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('3', 'Hà Nội FC', './assets/images/Hanoi_FC_logo.svg.png', 'SVĐ Hàng Đẫy');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('4', 'Topenland Bình Định', './assets/images/Binh_Dinh_FC_logo.svg.png', 'SVĐ Quy Nhơn');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('5', 'Đông Á Thanh Hóa', './assets/images/Logo_Dong_A_Thanh_Hoa.png', 'SVĐ Thanh Hóa');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('6', 'Hồng Lĩnh Hà Tĩnh', './assets/images/logo-clb-hong-linh-ha-tinh.png', 'SVĐ Hà Tĩnh');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('7', 'Nam Định', './assets/images/Nam_Dinh_FC_logo.svg.png', 'SVĐ Thiên Trường');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('8', 'Sài Gòn', './assets/images/SG.png', 'SVĐ Thống Nhất');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('9', 'Viettel', './assets/images/trandau/viettel_logo.png', 'SVĐ Hàng Đẫy');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('10', 'SHB Đà Nẵng', './assets/images/trandau/danang_logo.png', 'SVĐ Hòa Xuân');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('11', 'Hải Phòng FC', './assets/images/trandau/haiphong_logo.png', 'SVĐ Lạch Tray');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('12', 'Thành phố Hồ Chí Minh', './assets/images/trandau/HCM_logo.png', 'SVĐ Thống Nhất');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('13', 'Sông Lam Nghệ An', './assets/images/trandau/SNLA_logo.png', 'SVĐ Vinh');
INSERT INTO public.teams (id, name, logo, stadium) VALUES ('14', 'Becamex Bình Dương', './assets/images/trandau/binhduong_logo.png', 'SVĐ Gò Đậu');


--
-- TOC entry 3353 (class 0 OID 16399)
-- Dependencies: 214
-- Data for Name: tournaments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tournaments (id, name, logo, count_team, day_start, day_end) VALUES ('1', 'V - League', './assets/images/logo.png', 8, '2022-12-01', '2022-01-31');


--
-- TOC entry 3358 (class 0 OID 16434)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, name, password, phone, email, nationality, avatar, role) VALUES ('1', 'mhneh', 'mhneh', '0237777771', 'leminhhien25062002@gmail.com', 'Việt Nam', './assets/images/account/avatar_id.jpg', 1);
INSERT INTO public.users (id, name, password, phone, email, nationality, avatar, role) VALUES ('2', 'phandi', 'phandi', '0333777888', 'phanduy@gmail.com', 'Việt Nam', './assets/images/account/avatar_id.jpg', 2);
INSERT INTO public.users (id, name, password, phone, email, nationality, avatar, role) VALUES ('3', 'thuylieu', 'thuylieu', '0333111222', 'thuylieu@gmail.com', 'Việt Nam', './assets/images/account/avatar_id.jpg', 3);
INSERT INTO public.users (id, name, password, phone, email, nationality, avatar, role) VALUES ('c404d9cd-f2a3-474a-8385-81122338b944', 'mhneh', '589b9de6ce4d0cbb0e6107c9c5f95fba32952a3c8d59a45b7c43f424831d64cb1853a2a5d44', '0919221303', 'leminhh@gmail.com', 'VN', '', 1);
INSERT INTO public.users (id, name, password, phone, email, nationality, avatar, role) VALUES ('699fe277-11bf-46f6-8b21-43dbde648f0a', 'mh123', '43d251cdbeb7548d60ceb458a5a791bd35dc06fd131001b7c55de99f1c36389d1853a2c6ca6', '0333333333', 'leminhhh@gmail.com', 'VN', '', 1);


--
-- TOC entry 3202 (class 2606 OID 16419)
-- Name: player player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT player_pkey PRIMARY KEY (id);


--
-- TOC entry 3206 (class 2606 OID 16433)
-- Name: result result_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT result_pkey PRIMARY KEY (id);


--
-- TOC entry 3210 (class 2606 OID 16447)
-- Name: role_user role_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_user
    ADD CONSTRAINT role_user_pkey PRIMARY KEY (id);


--
-- TOC entry 3204 (class 2606 OID 16426)
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 16412)
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- TOC entry 3198 (class 2606 OID 16405)
-- Name: tournaments tournaments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tournaments
    ADD CONSTRAINT tournaments_pkey PRIMARY KEY (id);


--
-- TOC entry 3208 (class 2606 OID 16449)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


-- Completed on 2022-12-22 21:33:57

--
-- PostgreSQL database dump complete
--

