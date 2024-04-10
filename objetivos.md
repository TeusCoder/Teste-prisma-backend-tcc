pegar curriculo por pdf
<!-- sempre que mudar algo no controller, verificar se esta não dara errro na rota -->

comandos no prisma

mandar alterações do banco de dados (migrate)

-- npx prisma migrate dev
-- npx prisma studio

função para validar a senha:
/*
async function isValid(req: Request, res: Response) {
    const {
        email,
        senha,
    } = req.body;

    const user = await Empresa.userEmpresa.findUnique({ where: { email: email } })

    const isValid = await bcrypt.compare(senha, user.senha)

    if (!isValid) {
        return res.status(401).send("ERROU A SENHA")
    }

    res.status(200).send("compativel");
}*/

endereço
cliente 
empre