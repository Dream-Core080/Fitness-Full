const Category = require("../models/categoryModel");
const Collection = require("../models/collectionModel");
const Equipment = require("../models/equipmentModel");
const Exercise = require("../models/exerciseModel");
const Intro = require("../models/introModel");
const Quiz = require("../models/quizModel");
const Tag = require("../models/tagModel");

const VIMEO_ID = "265111898";

const seedDatabase = async () => {
    const [
        categoryCount,
        collectionCount,
        equipmentCount,
        exerciseCount,
        introCount,
        quizCount,
        tagCount,
    ] = await Promise.all([
        Category.countDocuments(),
        Collection.countDocuments(),
        Equipment.countDocuments(),
        Exercise.countDocuments(),
        Intro.countDocuments(),
        Quiz.countDocuments(),
        Tag.countDocuments(),
    ]);

    if (
        categoryCount > 0 ||
        collectionCount > 0 ||
        equipmentCount > 0 ||
        exerciseCount > 0 ||
        introCount > 0 ||
        quizCount > 0 ||
        tagCount > 0
    ) {
        console.log("Seed data detected, skipping seeding.");
        return;
    }

    const categories = await Category.insertMany([
        {
            title: "Warm-Up Essentials",
            thumbnail: "1.png",
        },
        {
            title: "Strength Training",
            thumbnail: "2.png",
        },
        {
            title: "Mobility Flow",
            thumbnail: "3.png",
        },
    ]);

    const equipments = await Equipment.insertMany([
        {
            title: "Resistance Band",
            thumbnail: "4.png",
            link: "https://example.com/resistance-band",
            price: 19.99,
        },
        {
            title: "Adjustable Dumbbell",
            thumbnail: "5.png",
            link: "https://example.com/adjustable-dumbbell",
            price: 249.99,
        },
    ]);

    const collections = await Collection.insertMany([
        {
            title: "Athlete Foundation",
            thumbnail: "6.png",
            tags: [],
        },
        {
            title: "Power Builder",
            thumbnail: "1.png",
            tags: [],
        },
    ]);

    const tags = await Tag.insertMany([
        {
            name: "Beginner Friendly",
            featuredCollections: [collections[0]._id],
        },
        {
            name: "Strength Focus",
            featuredCollections: [collections[1]._id],
        },
    ]);

    await Promise.all([
        Collection.findByIdAndUpdate(collections[0]._id, { $set: { tags: [tags[0]._id] } }),
        Collection.findByIdAndUpdate(collections[1]._id, { $set: { tags: [tags[1]._id] } }),
    ]);

    await Intro.create({
        vimeoId: VIMEO_ID,
    });

    await Quiz.insertMany([
        {
            title: "Foundations Check-In",
            level: 1,
        },
        {
            title: "Power Progress Audit",
            level: 2,
        },
    ]);

    await Exercise.insertMany([
        {
            title: "Dynamic Warm-Up Circuit",
            vimeoId: VIMEO_ID,
            thumbnail: "2.png",
            description: "Full-body dynamic warm-up to prep joints and prime the nervous system.",
            popularity: 5,
            difficulty: 1,
            categories: [categories[0]._id],
            collections: [collections[0]._id],
            equipments: [equipments[0]._id],
        },
        {
            title: "Single-Leg Power Drive",
            vimeoId: VIMEO_ID,
            thumbnail: "3.png",
            description: "Unilateral power movement focusing on hip stability and explosive drive.",
            popularity: 4,
            difficulty: 2,
            categories: [categories[1]._id],
            collections: [collections[1]._id],
            equipments: [equipments[1]._id],
        },
        {
            title: "Thoracic Mobility Flow",
            vimeoId: VIMEO_ID,
            thumbnail: "4.png",
            description: "Controlled sequence targeting thoracic spine mobility and posture.",
            popularity: 3,
            difficulty: 1,
            categories: [categories[2]._id],
            collections: [collections[0]._id],
            equipments: [],
        },
    ]);

    console.log("Seed data inserted successfully.");
};

module.exports = seedDatabase;

