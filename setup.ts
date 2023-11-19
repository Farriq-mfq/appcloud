import { PrismaClient } from "@prisma/client";
import * as figlet from 'figlet';
import { hash } from 'bcrypt'
const prisma = new PrismaClient()


figlet.text("Setup admin appCloud", async (err, data) => {
    console.clear()

    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);

    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });


    readline.question("Pilih Menu \n1.Tambah admin\n2.Reset admin database\n3.Reset files database\nnomer : ", (menu: string) => {
        const menuInt = parseInt(menu)
        if (menuInt === 1) {
            console.clear()
            figlet.text("Tambah admin", (err, data) => {
                console.log(data)
                readline.question("Masukan username : ", (username: string) => {
                    readline.question("Masukan password : ", async (password: string) => {
                        if (!(username.length > 0) && !(password.length > 0)) {
                            console.warn('input tidak valid')
                            process.exit()
                        }
                        try {
                            const createuser = await prisma.users.create({
                                data: {
                                    username,
                                    password: await hash(password, 10)
                                }
                            })

                            if (createuser) {
                                console.info("\n\n===> berhasil membuat admin <===")
                                process.exit()
                            }
                            process.exit()
                        } catch (e: any) {
                            console.warn('\n\n===> Terjadi kesalahan <===')
                            process.exit()
                        }
                    })
                })
            })
        } else if (menuInt === 2) {
            console.clear()
            figlet.text("Reset admin", async (err, data) => {
                console.log(data)
                console.log(`Loading...`)
                try {
                    const deleteAll = await prisma.$queryRaw`DELETE FROM users`;
                    if (deleteAll) console.log("Berhasil reset database admin")
                    process.exit()
                } catch (e) {
                    console.log("Gagal reset database admin")
                    process.exit()

                }
            })
        } else if (menuInt === 3) {
            console.clear()
            figlet.text("Reset files database", async (err, data) => {
                console.log(data)
                console.log(`Loading...`)
                try {
                    const deleteAll = await prisma.$queryRaw`DELETE FROM files`;
                    if (deleteAll) console.log("Berhasil reset files database")
                    process.exit()
                } catch (e) {
                    console.log("Gagal reset files database")
                    process.exit()

                }
            })
        } else {
            console.log("menu tidak tersedia")
            process.exit()
        }
    })


})