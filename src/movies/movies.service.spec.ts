import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { serialize } from 'v8';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트 하기 전에 실행 된다.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // 테스트 실행  it   = individual test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shoud be 4', () => {
    expect(2 + 2).toEqual(4)
  })

  describe("getAll", () => {
    // 배열의 인스턴스인지 TEST
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne", () => {
    it("should return movie", () => {
      service.create({
        title: "testMoive",
        genres: ["actin"],
        year: 2020
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined(); // undefined 가 아닐것이다.
      expect(movie.id).toEqual(1); // 영화의 id는 1이다.
    });
    it("shoud throw 404 error", () => {
      try {
        service.getOne(100)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`movie ${100} is not found`);
      }
    })
  })

  describe("deleteMovie", () => {
    it("deletes a moive", () => {
      service.create({
        title: "testMoive",
        genres: ["actin"],
        year: 2020
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterMovies = service.getAll();
      expect(afterMovies.length).toEqual(allMovies.length - 1); // 갯수가 같은지
      expect(afterMovies.length).toBeLessThan(allMovies.length); // 갯수가 작아야한다.
    })

    it("shoud throw 404 error", () => {
      try {
        service.getOne(100)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`movie ${100} is not found`);
      }
    })
  })


  describe("create", () => {
    it("should create a moive", () => {
      const beforeMovies = service.getAll().length; // feedback : getAll 하면 전과 후가 같다.
      service.create({
        title: "testMoive2",
        genres: ["action"],
        year: 2020
      });
      const afterMovies = service.getAll().length;
      // console.log(afterMovies.length, beforeMovies.length);
      expect(afterMovies).toBeGreaterThan(beforeMovies); // 갯수가 더 많아야 한다..
    })

    it("shoud throw 404 error", () => {
      try {
        service.getOne(100)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`movie ${100} is not found`);
      }
    })
  })

  describe("update Moive", () => {
    it("update Moive", () => {

      service.create({
        title: "testMoive2",
        genres: ["action"],
        year: 2020
      });
      const beforeMovies = service.getOne(1).title;
      service.update(1, {
        title: "testMoive3",
      });
      const afterMovies = service.getOne(1).title;
      expect(beforeMovies).toEqual("testMoive2");
      expect(afterMovies).toEqual("testMoive3");
    })
    it("shoud throw 404 error", () => {
      try {
        service.getOne(100)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`movie ${100} is not found`);
      }
    })

  })

});
